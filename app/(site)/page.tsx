import { Metadata } from "next"
import Box2 from "@/components/Box/Box2"
import Box from "@/components/Box/Box"
import Brands from "@/components/Brands"
import FunFact from "@/components/FunFact"
import Integration from "@/components/Integration"
import { Web3Provider } from "../../components/connect-button/connectKit.config"
import Roadmap from "@/components/Roadmap/index"
export const metadata: Metadata = {
  title: "PuppyCoin on Arbitrum",
  description: "",
  // other metadata
}

export default function Home() {
  return (
    <>
      <main>
        <Box />
        <FunFact />
        <Brands />
        <Integration />
        <Roadmap />
      </main>
    </>
  )
}
