import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'bg-[#181716] text-[#f4efe7] shadow-[0_14px_30px_rgba(24,23,22,0.14)] hover:-translate-y-0.5 hover:bg-[#2d2a28]',
  secondary: 'bg-[#fffaf2]/85 text-[#181716] hover:-translate-y-0.5 hover:bg-[#e7ded1]',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
  disabled = false,
}) => {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full border border-[#181716] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181716]/20',
    variantClasses[variant] ?? variantClasses.secondary,
    disabled ? 'cursor-not-allowed opacity-60 hover:translate-y-0' : '',
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
