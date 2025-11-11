type TSettings = {
  title: string;
  text: string;
}

export const SETTINGS: TSettings[] = [
  {
    title: 'Strictly necessary (always included)', 
    text: 'These cookies are necessary for the operation of the website and cannot be disabled. They are usually set only in response to your actions.'
  },
  {
    title: 'Functional', 
    text: 'They allow advanced features and personalization, such as video and chat.'
  },
  {
    title: 'Analytical', 
    text: 'They help us understand how visitors interact with the site by collecting and sharing information anonymously.'
  },
  {
    title: 'Advertising', 
    text: 'They are used to display relevant ads based on your interests.'
  }
]