const NetlifyForm = () => {
  return (
    <form 
      name="modal" 
      data-netlify="true" 
      data-netlify-honeypot="bot-field" 
      hidden
    >
      <input type="hidden" name="form-name" value="modal" />
      <input type="email" name="email" />
    </form>
  );
}

export default NetlifyForm;