'use client';

import { useState } from 'react';
import styles from './CodeCopyButton.module.css';

interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className={styles.button} aria-label="Copy code to clipboard">
      {copied ? '[COPIED]' : '[COPY]'}
    </button>
  );
}
