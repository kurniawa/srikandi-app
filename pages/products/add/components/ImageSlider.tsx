import { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          <div className={`keen-slider__slide`}>
            <Image src={'/data/images/at_desy.jpg'} alt="..." width={500} height={500} />
          </div>
          <div className={`keen-slider__slide`}>
            <Image src={'/data/images/cc-setengah-rantai.jpg'} alt="..." width={500} height={500} />
          </div>
          <div className={`keen-slider__slide`}>
            <Image src={'/data/images/cc-wedding-mp1.jpg'} alt="..." width={500} height={500} />
          </div>
          <div className={`keen-slider__slide`}>
            <Image src={'/data/images/kkl-biji-lada.jpg'} alt="..." width={500} height={500} />
          </div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex py-2 px-0 justify-center">
            {[
                ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
                return (
                <button
                    key={idx}
                    onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                    }}
                    className={"w-3 h-3 bg-slate-50 my-0 mx-1 border-none rounded-xl cursor-pointer" + (currentSlide === idx ? " bg-slate-700" : "")}
                ></button>
                )
            })}
            </div>
          </>
        )}
      </div>
      {/* {loaded && instanceRef.current && (
        <div className="flex py-2 px-0 justify-center">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"w-3 h-3 bg-slate-50 my-0 mx-1 border-none rounded-xl cursor-pointer" + (currentSlide === idx ? " bg-slate-700" : "")}
              ></button>
            )
          })}
        </div>
      )} */}
    </>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? " fill-slate-500" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`w-8 h-8 absolute top-1/2 -translate-y-1/2 fill-white cursor-pointer ${
        props.left ? "left-1" : "left-auto right-1"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
