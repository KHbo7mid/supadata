import { Navbar,Content,Footer,Hero ,Benifits} from '../Components/index';
import AnimatedCursor from "react-animated-cursor"

export default function Home() {
  return (
    <div>
       <AnimatedCursor 
     innerSize={15}
     outerSize={20}
     color="250, 101, 60"
     outerAlpha={0.2}
     innerScale={0.7}
     outerScale={5}
     clickables={[
      "a",
      "button"
     ]}
    
    />
       <Navbar />
     <Content>
       <section id='hero'>
       <Hero />
       </section>
       <section id='benifits'>
       <Benifits />
       </section>
     </Content>
<Footer/>
    </div>
  )
}
