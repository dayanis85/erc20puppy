"use client"
import SectionHeader from "../Common/SectionHeader"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "./Roadmap.module.css"

const Roadmap = () => {
  const events = [
    {
      date: "2024-20-08",
      title: "Check Valid Addresses",
      description: "Checking for addresses that are valid to get the airdrop",
    },
    {
      date: "2023-26-08",
      title: "Start Airdropping",
      description: "Start airdropping to included addresses",
    },
    {
      date: "2023-26-08",
      title: "Add Liquidity",
      description: "Add liquidity and start swapping on uniswap",
    },
    {
      date: "2023-01-09",
      title: "Listing In Mexc",
      description: "Listing in Mexc exchange and start trading",
    },
    {
      date: "2023-12-09",
      title: "Making Dex",
      description: "making the first dex for meme coin",
    },
    {
      date: "2023-15-09",
      title: "Be Up To Date!!!",
      description: "More information coming...",
    },
  ]
  return (
    <>
      <section style={{ marginTop: "50px", marginBottom: "50px" }}>
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <div className="animate_top mx-auto text-center">
            <SectionHeader
              headerInfo={{
                title: `Roadmap`,
                subtitle: ``,
                description: ``,
              }}
            />
          </div>
          {/* <!-- Section Title End --> */}
        </div>
        <div className={styles.timeline}>
          {events.map((event, index) => (
            <div
              key={index}
              className={`${styles.container} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
            >
              <div className={styles.content}>
                <h2>{event.date}</h2>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Roadmap
