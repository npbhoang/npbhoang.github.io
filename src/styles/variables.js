import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #020c1b;
    --navy: #0f172a;
    --light-navy: #1e293b;
    --lightest-navy: #334155;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #475569;
    --slate: #64748b;
    --light-slate: #94a3b8;
    --lightest-slate: #cbd5e1;
    --white: #e2e8f0;
    --green: #60a5fa;
    --green-tint: rgba(96, 165, 250, 0.1);
    --pink: #a78bfa;
    --blue: #38bdf8;
    --nav-bg: rgba(15, 23, 42, 0.85);

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }

  [data-theme='light'] {
    --dark-navy: #f8fafc;
    --navy: #ffffff;
    --light-navy: #f1f5f9;
    --lightest-navy: #e2e8f0;
    --navy-shadow: rgba(30, 41, 59, 0.15);
    --dark-slate: #94a3b8;
    --slate: #475569;
    --light-slate: #334155;
    --lightest-slate: #1e293b;
    --white: #0f172a;
    --green: #4a6fa5;
    --green-tint: rgba(74, 111, 165, 0.1);
    --pink: #7c3aed;
    --blue: #0284c7;
    --nav-bg: rgba(255, 255, 255, 0.9);
  }
`;

export default variables;
