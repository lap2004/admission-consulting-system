'use client';

export default function LoadingDots({
  size = 6,    
  gap  = 4,          
  color = 'bg-gray-600',
}) {
  const style = { width: size, height: size };

  return (
    <div
      className="flex items-end"
      style={{ gap }}                     
      aria-label="Loading"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`${color} rounded-full animate-bounce-y`}
          style={{ ...style, animationDelay: `${i * 0.15}s` }} 
        />
      ))}
    </div>
  );
}
