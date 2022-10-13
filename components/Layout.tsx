interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {children}
    </div>
  );
}
