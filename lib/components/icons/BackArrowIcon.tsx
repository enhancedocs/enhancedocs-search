type BackArrowIconProps = {
  className?: string;
}

export default function BackArrowIcon ({ className }: BackArrowIconProps) {
  return (
    <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em"
      xmlns="http://www.w3.org/2000/svg">
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"></path>
    </svg>
  );
}
