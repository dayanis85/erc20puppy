"use client"
import SectionHeader from "../Common/SectionHeader"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from "./Roadmap.module.css"

const Roadmap = () => {
  const events = [
    {
      date: "2023-01-01",
      title: "Event 1",
      description: "Description for event 1",
    },
    {
      date: "2023-02-01",
      title: "Event 2",
      description: "Description for event 2",
    },
    {
      date: "2023-03-01",
      title: "Event 3",
      description: "Description for event 3",
    },
    {
      date: "2023-04-01",
      title: "Event 4",
      description: "Description for event 3",
    },
    {
      date: "2023-05-01",
      title: "Event 5",
      description: "Description for event 3",
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
