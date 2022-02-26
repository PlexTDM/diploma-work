const Form = props => {
  return (
    <form className='flex w-full flex-col min-h-[200px] h-auto text-base justify-between' {...props}>
      {props.children}
    </form>
  )
}

export default Form;