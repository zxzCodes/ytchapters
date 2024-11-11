interface HeaderProps { 
    text: string
}

const Header = ({ text }: HeaderProps) => {
  return (
    <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl md:text-3xl">
        {text}
    </h1>
  )
}

export default Header