import { SVGProps, useId } from 'react';

/**
 * Illustrated Icons - Hand-drawn style SVG icons
 * Design: Soft, rounded, playful illustration style
 * Color: Gradient fills with depth
 * Note: Uses useId() to generate unique gradient IDs and prevent conflicts
 */

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

// Water Drop - Habit tracking
export function DropIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A89DC" />
          <stop offset="100%" stopColor="#5DADE2" />
        </linearGradient>
      </defs>
      {/* Main drop shape */}
      <path
        d="M32 8C32 8 18 22 18 34C18 42 24 48 32 48C40 48 46 42 46 34C46 22 32 8 32 8Z"
        fill={`url(#${gradientId})`}
        stroke="#3A6CB0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Highlight */}
      <ellipse cx="28" cy="24" rx="4" ry="6" fill="white" opacity="0.4" />
      {/* Inner sparkle */}
      <circle cx="35" cy="30" r="2" fill="white" opacity="0.6" />
    </svg>
  );
}

// Chart - Statistics & Analytics
export function ChartIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Background card */}
      <rect x="8" y="12" width="48" height="44" rx="8" fill={`url(#${gradientId})`} opacity="0.1" />
      {/* Bars */}
      <rect x="14" y="36" width="8" height="14" rx="3" fill={`url(#${gradientId})`} />
      <rect x="28" y="28" width="8" height="22" rx="3" fill={`url(#${gradientId})`} />
      <rect x="42" y="20" width="8" height="30" rx="3" fill={`url(#${gradientId})`} />
      {/* Trend line */}
      <path
        d="M12 42 Q 22 32, 32 24 T 52 14"
        stroke="#9333EA"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Data points */}
      <circle cx="20" cy="38" r="3" fill="#EC4899" />
      <circle cx="32" cy="26" r="3" fill="#EC4899" />
      <circle cx="44" cy="18" r="3" fill="#EC4899" />
    </svg>
  );
}

// Trophy - Achievement & Goals
export function TrophyIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      {/* Base */}
      <rect x="22" y="48" width="20" height="4" rx="2" fill={`url(#${gradientId})`} />
      <rect x="26" y="44" width="12" height="6" rx="2" fill={`url(#${gradientId})`} opacity="0.8" />
      {/* Cup stem */}
      <rect x="28" y="38" width="8" height="8" rx="1" fill={`url(#${gradientId})`} />
      {/* Cup body */}
      <path
        d="M20 12 L20 26 C20 32 24 36 32 36 C40 36 44 32 44 26 L44 12 L20 12Z"
        fill={`url(#${gradientId})`}
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Handles */}
      <path d="M18 16 C14 16 12 18 12 22 C12 24 13 26 16 26" stroke={`url(#${gradientId})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M46 16 C50 16 52 18 52 22 C52 24 51 26 48 26" stroke={`url(#${gradientId})`} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Star decoration */}
      <path d="M32 18 L34 23 L39 23 L35 26 L37 31 L32 28 L27 31 L29 26 L25 23 L30 23 Z" fill="white" opacity="0.4" />
    </svg>
  );
}

// Clock - Reminders & Schedule
export function ClockIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Clock face */}
      <circle cx="32" cy="34" r="22" fill={`url(#${gradientId})`} stroke="#047857" strokeWidth="2" />
      {/* Inner circle */}
      <circle cx="32" cy="34" r="18" fill="white" opacity="0.2" />
      {/* Hour markers */}
      <circle cx="32" cy="18" r="2" fill="white" opacity="0.6" />
      <circle cx="32" cy="50" r="2" fill="white" opacity="0.6" />
      <circle cx="46" cy="34" r="2" fill="white" opacity="0.6" />
      <circle cx="18" cy="34" r="2" fill="white" opacity="0.6" />
      {/* Clock hands */}
      <line x1="32" y1="34" x2="32" y2="24" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="34" x2="40" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="32" cy="34" r="3" fill="white" />
      {/* Bell on top */}
      <path d="M28 12 Q 28 8, 32 8 Q 36 8, 36 12" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="30" y="10" width="4" height="2" rx="1" fill="#10B981" />
    </svg>
  );
}

// Target - Goals & Focus
export function TargetIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="32" cy="32" r="24" stroke={`url(#${gradientId})`} strokeWidth="3" fill="none" opacity="0.3" />
      {/* Middle ring */}
      <circle cx="32" cy="32" r="16" stroke={`url(#${gradientId})`} strokeWidth="3" fill="none" opacity="0.5" />
      {/* Inner ring */}
      <circle cx="32" cy="32" r="8" fill={`url(#${gradientId})`} opacity="0.7" />
      {/* Bullseye */}
      <circle cx="32" cy="32" r="4" fill={`url(#${gradientId})`} />
      {/* Arrow */}
      <path
        d="M48 16 L34 30"
        stroke="#9333EA"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M48 16 L44 16 L48 20 Z" fill="#9333EA" />
    </svg>
  );
}

// Sparkles - Premium & Special
export function SparklesIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Large star */}
      <path
        d="M32 8 L35 22 L49 25 L35 28 L32 42 L29 28 L15 25 L29 22 Z"
        fill={`url(#${gradientId})`}
        stroke="#D97706"
        strokeWidth="1.5"
      />
      {/* Small star top right */}
      <path
        d="M48 14 L49 18 L53 19 L49 20 L48 24 L47 20 L43 19 L47 18 Z"
        fill={`url(#${gradientId})`}
      />
      {/* Small star bottom left */}
      <path
        d="M16 40 L17 44 L21 45 L17 46 L16 50 L15 46 L11 45 L15 44 Z"
        fill={`url(#${gradientId})`}
      />
      {/* Tiny sparkle */}
      <circle cx="50" cy="38" r="2" fill="#FBBF24" />
      <circle cx="20" cy="20" r="2" fill="#FBBF24" />
    </svg>
  );
}

// Download - App Download
export function DownloadIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A89DC" />
          <stop offset="100%" stopColor="#5DADE2" />
        </linearGradient>
      </defs>
      {/* Cloud */}
      <path
        d="M20 28 C16 28 12 32 12 36 C12 40 16 44 20 44 L44 44 C48 44 52 40 52 36 C52 32 48 28 44 28 C44 22 38 16 32 16 C26 16 20 22 20 28Z"
        fill={`url(#${gradientId})`}
        stroke="#3A6CB0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Arrow */}
      <path d="M32 24 L32 40" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 34 L32 40 L38 34" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Base line */}
      <line x1="24" y1="48" x2="40" y2="48" stroke="#4A89DC" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Smartphone - Mobile App
export function SmartphoneIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Phone body */}
      <rect x="18" y="8" width="28" height="48" rx="4" fill={`url(#${gradientId})`} stroke="#4F46E5" strokeWidth="2" />
      {/* Screen */}
      <rect x="21" y="14" width="22" height="36" rx="2" fill="white" opacity="0.9" />
      {/* Notch */}
      <rect x="28" y="11" width="8" height="2" rx="1" fill="#4F46E5" opacity="0.3" />
      {/* App icons on screen */}
      <circle cx="26" cy="20" r="2" fill="#4A89DC" opacity="0.6" />
      <circle cx="32" cy="20" r="2" fill="#9333EA" opacity="0.6" />
      <circle cx="38" cy="20" r="2" fill="#EC4899" opacity="0.6" />
      {/* Content lines */}
      <rect x="24" y="26" width="16" height="2" rx="1" fill="#6366F1" opacity="0.3" />
      <rect x="24" y="30" width="12" height="2" rx="1" fill="#6366F1" opacity="0.3" />
      {/* Home button indicator */}
      <rect x="30" y="52" width="4" height="2" rx="1" fill="white" opacity="0.5" />
    </svg>
  );
}

// Check - Success & Completion
export function CheckIcon({ size = 64, ...props }: IconProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Circle background */}
      <circle cx="32" cy="32" r="24" fill={`url(#${gradientId})`} />
      {/* Check mark */}
      <path
        d="M20 32 L28 40 L44 24"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Shine effect */}
      <circle cx="24" cy="20" r="4" fill="white" opacity="0.3" />
    </svg>
  );
}
