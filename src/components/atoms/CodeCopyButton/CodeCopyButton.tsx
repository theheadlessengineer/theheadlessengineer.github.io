'use client';

import { useEffect } from 'react';
import styles from './CodeCopyButton.module.css';

export const CodeCopyButton = () => {
  useEffect(() => {
    const addCopyButtons = () => {
      const preElements = document.querySelectorAll('pre');
      
      preElements.forEach((pre) => {
        // Skip if button already exists
        if (pre.querySelector(`.${styles.copyButton}`)) return;
        
        // Create copy button
        const button = document.createElement('button');
        button.className = styles.copyButton;
        button.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;
        button.title = 'Copy code';
        
        // Add click handler
        button.addEventListener('click', async () => {
          const code = pre.textContent || '';
          await navigator.clipboard.writeText(code);
          
          // Show feedback
          button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          `;
          button.title = 'Copied!';
          
          setTimeout(() => {
            button.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            `;
            button.title = 'Copy code';
          }, 2000);
        });
        
        // Make pre relative and add button
        pre.style.position = 'relative';
        pre.appendChild(button);
      });
    };
    
    // Add buttons on mount and when content changes
    addCopyButtons();
    
    // Observer for dynamically added content
    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return null;
};
