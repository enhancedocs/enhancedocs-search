type BackArrowIconProps = {
  className?: string;
}

function BackArrowIcon({ className }: BackArrowIconProps) {
  return (
    <svg className={className} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
      xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"></path>
    </svg>
  )
}

export default BackArrowIcon;
