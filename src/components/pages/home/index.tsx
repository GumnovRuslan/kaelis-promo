import { 
  Hero,
  Subscribe, 
  ArticlesPopular,
  AboutApp,
  Message,
  Questionnaire,
  TestModal,
  ModalSubscribe,
} from "@/components/sections";
import { TestModalProvider } from "@/context/TestModalContext";
import { ModalSubscribeProvider } from "@/context/modalSubscribe";

const HomePage = () => {
  return (
    <TestModalProvider>
      <ModalSubscribeProvider>
        <Hero />
        <Subscribe />
        <ArticlesPopular />
        <Questionnaire/>
        <AboutApp />
        <Message textIsShow/>
        
        <ModalSubscribe/>
        <TestModal/>
      </ModalSubscribeProvider>
    </TestModalProvider>
  )
}

export default HomePage;