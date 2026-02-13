'use client';

import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

// HTTP Status Code Data
const statusCodeGroups = [
  {
    range: '1xx',
    name: 'Informational',
    description: 'Request received, continuing process',
    codes: [
      { code: 100, message: 'Continue', description: 'Server has received request headers, client should proceed with request body' },
      { code: 101, message: 'Switching Protocols', description: 'Server is switching protocols as requested by the client' },
      { code: 102, message: 'Processing', description: 'Server has received and is processing the request (WebDAV)' },
      { code: 103, message: 'Early Hints', description: 'Used to return some response headers before final HTTP message' },
    ],
    color: '#3B82F6', // blue
  },
  {
    range: '2xx',
    name: 'Success',
    description: 'Request successfully received, understood, and accepted',
    codes: [
      { code: 200, message: 'OK', description: 'Standard response for successful HTTP requests' },
      { code: 201, message: 'Created', description: 'Request fulfilled, new resource created' },
      { code: 202, message: 'Accepted', description: 'Request accepted for processing, but not completed' },
      { code: 203, message: 'Non-Authoritative Information', description: 'Request successful but transformed by proxy' },
      { code: 204, message: 'No Content', description: 'Request successful but no content to return' },
      { code: 205, message: 'Reset Content', description: 'Request successful, reset document view' },
      { code: 206, message: 'Partial Content', description: 'Server delivering only part of resource (byte serving)' },
      { code: 207, message: 'Multi-Status', description: 'Multiple status codes for multiple operations (WebDAV)' },
      { code: 208, message: 'Already Reported', description: 'Members already enumerated (WebDAV)' },
      { code: 226, message: 'IM Used', description: 'Server fulfilled GET request with instance manipulations' },
    ],
    color: '#10B981', // green
  },
  {
    range: '3xx',
    name: 'Redirection',
    description: 'Further action needs to be taken to complete the request',
    codes: [
      { code: 300, message: 'Multiple Choices', description: 'Multiple options for the resource available' },
      { code: 301, message: 'Moved Permanently', description: 'Resource permanently moved to new URL' },
      { code: 302, message: 'Found', description: 'Resource temporarily under different URI' },
      { code: 303, message: 'See Other', description: 'Response to request found under another URI using GET' },
      { code: 304, message: 'Not Modified', description: 'Resource not modified since last request' },
      { code: 305, message: 'Use Proxy', description: 'Requested resource must be accessed through proxy (deprecated)' },
      { code: 307, message: 'Temporary Redirect', description: 'Request should be repeated with another URI, same method' },
      { code: 308, message: 'Permanent Redirect', description: 'Request and all future requests should use another URI' },
    ],
    color: '#F59E0B', // amber
  },
  {
    range: '4xx',
    name: 'Client Error',
    description: 'Request contains bad syntax or cannot be fulfilled',
    codes: [
      { code: 400, message: 'Bad Request', description: 'Server cannot process request due to client error' },
      { code: 401, message: 'Unauthorized', description: 'Authentication required and has failed or not provided' },
      { code: 402, message: 'Payment Required', description: 'Reserved for future use in digital payment systems' },
      { code: 403, message: 'Forbidden', description: 'Server understood request but refuses to authorize it' },
      { code: 404, message: 'Not Found', description: 'Requested resource could not be found' },
      { code: 405, message: 'Method Not Allowed', description: 'Request method not supported for resource' },
      { code: 406, message: 'Not Acceptable', description: 'Resource not capable of generating acceptable content' },
      { code: 407, message: 'Proxy Authentication Required', description: 'Client must authenticate with the proxy' },
      { code: 408, message: 'Request Timeout', description: 'Server timed out waiting for request' },
      { code: 409, message: 'Conflict', description: 'Request conflicts with current state of server' },
      { code: 410, message: 'Gone', description: 'Resource no longer available and will not be available again' },
      { code: 411, message: 'Length Required', description: 'Request did not specify length of content' },
      { code: 412, message: 'Precondition Failed', description: 'Server does not meet preconditions from request' },
      { code: 413, message: 'Payload Too Large', description: 'Request entity larger than server willing to process' },
      { code: 414, message: 'URI Too Long', description: 'URI provided was too long for server to process' },
      { code: 415, message: 'Unsupported Media Type', description: 'Request entity has unsupported media type' },
      { code: 416, message: 'Range Not Satisfiable', description: 'Client requested portion of file server cannot supply' },
      { code: 417, message: 'Expectation Failed', description: 'Server cannot meet requirements of Expect header' },
      { code: 418, message: "I'm a teapot", description: 'Server refuses to brew coffee with a teapot (April Fools)' },
      { code: 421, message: 'Misdirected Request', description: 'Request directed at server unable to produce response' },
      { code: 422, message: 'Unprocessable Entity', description: 'Request well-formed but contains semantic errors (WebDAV)' },
      { code: 423, message: 'Locked', description: 'Resource being accessed is locked (WebDAV)' },
      { code: 424, message: 'Failed Dependency', description: 'Request failed due to failure of previous request (WebDAV)' },
      { code: 425, message: 'Too Early', description: 'Server unwilling to risk processing replayed request' },
      { code: 426, message: 'Upgrade Required', description: 'Client should switch to different protocol' },
      { code: 428, message: 'Precondition Required', description: 'Origin server requires request to be conditional' },
      { code: 429, message: 'Too Many Requests', description: 'User has sent too many requests in given time' },
      { code: 431, message: 'Request Header Fields Too Large', description: 'Server unwilling to process request with large headers' },
      { code: 451, message: 'Unavailable For Legal Reasons', description: 'Resource unavailable due to legal reasons' },
    ],
    color: '#EF4444', // red
  },
  {
    range: '5xx',
    name: 'Server Error',
    description: 'Server failed to fulfill an apparently valid request',
    codes: [
      { code: 500, message: 'Internal Server Error', description: 'Generic error message for unexpected server condition' },
      { code: 501, message: 'Not Implemented', description: 'Server does not recognize request method' },
      { code: 502, message: 'Bad Gateway', description: 'Server received invalid response from upstream server' },
      { code: 503, message: 'Service Unavailable', description: 'Server currently unavailable (overloaded or maintenance)' },
      { code: 504, message: 'Gateway Timeout', description: 'Server did not receive timely response from upstream' },
      { code: 505, message: 'HTTP Version Not Supported', description: 'Server does not support HTTP protocol version' },
      { code: 506, message: 'Variant Also Negotiates', description: 'Transparent content negotiation results in circular reference' },
      { code: 507, message: 'Insufficient Storage', description: 'Server unable to store representation (WebDAV)' },
      { code: 508, message: 'Loop Detected', description: 'Server detected infinite loop while processing (WebDAV)' },
      { code: 510, message: 'Not Extended', description: 'Further extensions to request required for fulfillment' },
      { code: 511, message: 'Network Authentication Required', description: 'Client needs to authenticate to gain network access' },
    ],
    color: '#DC2626', // dark red
  },
];

// Title Screen Component
const TitleScreen: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        transform: `scale(${titleScale})`,
        opacity: titleOpacity,
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '120px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          fontFamily: '"Playfair Display", serif',
        }}>
          HTTP Status Codes
        </h1>
        <p style={{
          fontSize: '36px',
          color: '#94A3B8',
          marginTop: '20px',
          opacity: subtitleOpacity,
          fontFamily: '"Inter", sans-serif',
        }}>
          A Complete Guide
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Group Introduction Component
const GroupIntro: React.FC<{ group: typeof statusCodeGroups[0]; durationInFrames: number }> = ({ 
  group, 
  durationInFrames 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 30], [100, 0], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#0F172A',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px',
    }}>
      <div style={{
        transform: `translateY(${titleY}px)`,
        opacity,
        textAlign: 'center',
        maxWidth: '1200px',
      }}>
        <div style={{
          fontSize: '180px',
          fontWeight: 'bold',
          color: group.color,
          marginBottom: '20px',
          fontFamily: '"Bebas Neue", sans-serif',
          letterSpacing: '4px',
        }}>
          {group.range}
        </div>
        <h2 style={{
          fontSize: '64px',
          color: '#F1F5F9',
          marginBottom: '30px',
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 700,
        }}>
          {group.name}
        </h2>
        <p style={{
          fontSize: '32px',
          color: '#CBD5E1',
          fontFamily: '"Inter", sans-serif',
          lineHeight: 1.6,
        }}>
          {group.description}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Status Code Detail Component
const StatusCodeDetail: React.FC<{ 
  code: { code: number; message: string; description: string };
  groupColor: string;
  durationInFrames: number;
}> = ({ code, groupColor, durationInFrames }) => {
  const frame = useCurrentFrame();

  const codeOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const codeScale = interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: 'clamp' });
  const detailsOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp' });
  const detailsY = interpolate(frame, [10, 30], [30, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#0F172A',
      padding: '80px',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Status Code */}
        <div style={{
          opacity: codeOpacity,
          transform: `scale(${codeScale})`,
          marginBottom: '40px',
        }}>
          <div style={{
            fontSize: '200px',
            fontWeight: 'bold',
            color: groupColor,
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '8px',
            textShadow: `0 0 40px ${groupColor}40`,
          }}>
            {code.code}
          </div>
        </div>

        {/* Details */}
        <div style={{
          opacity: detailsOpacity,
          transform: `translateY(${detailsY}px)`,
        }}>
          <h3 style={{
            fontSize: '72px',
            color: '#F1F5F9',
            marginBottom: '30px',
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
          }}>
            {code.message}
          </h3>
          <p style={{
            fontSize: '36px',
            color: '#94A3B8',
            lineHeight: 1.8,
            fontFamily: '"Inter", sans-serif',
          }}>
            {code.description}
          </p>
        </div>

        {/* Decorative element */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '80px',
          right: '80px',
          height: '4px',
          background: `linear-gradient(90deg, ${groupColor} 0%, transparent 100%)`,
          opacity: detailsOpacity,
        }} />
      </div>
    </AbsoluteFill>
  );
};

// Main Video Composition
const HTTPStatusCodesVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  
  const titleDuration = 4 * fps; // 4 seconds
  const groupIntroDuration = 3 * fps; // 3 seconds per group intro
  const codeDetailDuration = 4 * fps; // 4 seconds per code
  const transitionDuration = 0.5 * fps; // 0.5 seconds transition

  let currentFrame = 0;

  return (
    <AbsoluteFill>
      {/* Title Screen */}
      <Sequence from={currentFrame} durationInFrames={titleDuration}>
        <TitleScreen durationInFrames={titleDuration} />
      </Sequence>
      
      {(() => {
        currentFrame += titleDuration;
        
        return statusCodeGroups.map((group, groupIndex) => {
          const groupStart = currentFrame;
          
          const elements = [
            // Group Introduction
            <Sequence key={`group-intro-${groupIndex}`} from={groupStart} durationInFrames={groupIntroDuration}>
              <GroupIntro group={group} durationInFrames={groupIntroDuration} />
            </Sequence>
          ];
          
          currentFrame += groupIntroDuration;
          
          // Status Code Details
          group.codes.forEach((code, codeIndex) => {
            elements.push(
              <Sequence 
                key={`code-${groupIndex}-${codeIndex}`} 
                from={currentFrame} 
                durationInFrames={codeDetailDuration}
              >
                <StatusCodeDetail 
                  code={code} 
                  groupColor={group.color}
                  durationInFrames={codeDetailDuration}
                />
              </Sequence>
            );
            currentFrame += codeDetailDuration;
          });
          
          return elements;
        });
      })()}
    </AbsoluteFill>
  );
};

// Calculate total duration
const calculateTotalDuration = (fps: number) => {
  const titleDuration = 4 * fps;
  const groupIntroDuration = 3 * fps;
  const codeDetailDuration = 4 * fps;
  
  let total = titleDuration;
  statusCodeGroups.forEach(group => {
    total += groupIntroDuration;
    total += group.codes.length * codeDetailDuration;
  });
  
  return total;
};

// Main Page Component
export default function HTTPStatusCodesPage() {
  const [showPlayer, setShowPlayer] = useState(false);
  const fps = 30;
  const totalDuration = calculateTotalDuration(fps);
  const durationInSeconds = Math.ceil(totalDuration / fps);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
      padding: '40px 20px',
      fontFamily: '"Inter", sans-serif',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          color: 'white',
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '20px',
            fontFamily: '"Playfair Display", serif',
          }}>
            HTTP Status Codes Video
          </h1>
          <p style={{
            fontSize: '20px',
            opacity: 0.9,
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            A comprehensive video guide covering all HTTP status codes from 1xx to 5xx.
            Duration: approximately {durationInSeconds} seconds ({Math.floor(durationInSeconds / 60)} minutes {durationInSeconds % 60} seconds)
          </p>
        </div>

        {/* Video Player */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          marginBottom: '60px',
        }}>
          {!showPlayer ? (
            <div style={{
              textAlign: 'center',
              padding: '100px 40px',
            }}>
              <button
                onClick={() => setShowPlayer(true)}
                style={{
                  fontSize: '20px',
                  padding: '20px 60px',
                  backgroundColor: '#667EEA',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#5568d3';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 30px rgba(102, 126, 234, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#667EEA';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
                }}
              >
                Load Video Player
              </button>
              <p style={{
                marginTop: '20px',
                color: '#666',
                fontSize: '14px',
              }}>
                Click to initialize the Remotion player
              </p>
            </div>
          ) : (
            <div>
              <Player
                component={HTTPStatusCodesVideo}
                durationInFrames={totalDuration}
                fps={fps}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                }}
                controls
              />
            </div>
          )}
        </div>

        {/* Status Code Reference */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#1F2937',
            fontFamily: '"Montserrat", sans-serif',
          }}>
            Quick Reference
          </h2>
          
          <div style={{ display: 'grid', gap: '30px' }}>
            {statusCodeGroups.map((group, index) => (
              <div key={index} style={{
                borderLeft: `6px solid ${group.color}`,
                paddingLeft: '20px',
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: group.color,
                  marginBottom: '10px',
                }}>
                  {group.range} - {group.name}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#6B7280',
                  marginBottom: '15px',
                }}>
                  {group.description}
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '10px',
                }}>
                  {group.codes.map((code) => (
                    <div key={code.code} style={{
                      fontSize: '14px',
                      color: '#374151',
                      padding: '8px 12px',
                      backgroundColor: '#F9FAFB',
                      borderRadius: '6px',
                    }}>
                      <strong style={{ color: group.color }}>{code.code}</strong> - {code.message}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Font imports */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@600;700&family=Inter:wght@400;500&family=Space+Mono:wght@700&family=Bebas+Neue&display=swap');
      `}</style>
    </div>
  );
}