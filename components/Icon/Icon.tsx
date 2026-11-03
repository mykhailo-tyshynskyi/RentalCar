import css from './Icon.module.css'

type IconProps = {
  id: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function Icon({
  id,
  width = 24,
  height = 24,
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
    >
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  );
}