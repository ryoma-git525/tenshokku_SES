import { SERVICES } from "@/lib/constants";

export function ServiceBanner() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] mt-24 w-screen overflow-hidden bg-black px-6 pb-32 pt-24 sm:mt-32 sm:px-10 sm:pb-40 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:repeating-radial-gradient(ellipse_at_58%_38%,transparent_0,transparent_18px,rgba(255,255,255,0.55)_19px,transparent_20px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_52%_0%,rgba(255,255,255,0.16),transparent_42rem)]"
      />

      <div className="relative mx-auto max-w-[112rem]">
        <div className="scroll-reveal mb-16 max-w-[98rem] text-left sm:mb-20">
          <p className="text-4xl font-semibold leading-[1.22] tracking-normal text-white sm:text-6xl lg:text-7xl">
            この診断で変わるのは、仕事ではありません。
            <br />
            「自分にはこんな選択肢もあるんだ。」そう思える求人を、少しだけのぞいてみませんか。
          </p>
        </div>

      <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <a
            key={service.title}
            href={service.href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            aria-label={`${service.title}を別タブで開く`}
            className="group scroll-reveal block transition duration-500 hover:-translate-y-2 active:translate-y-0 active:scale-[0.98]"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.65rem] bg-[linear-gradient(145deg,#ffffff_0%,#f8fafc_58%,#eef3f6_100%)] shadow-[0_34px_110px_rgba(0,0,0,0.38)] ring-1 ring-white/12 transition duration-500 group-hover:shadow-[0_44px_130px_rgba(0,0,0,0.52)] group-hover:ring-white/22">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.95),transparent_34%),linear-gradient(180deg,transparent,rgba(10,22,30,0.05))]" />
              <div className="relative flex h-full items-center justify-center">
                <img
                  src={service.image}
                  alt={service.title}
                  width={service.imageWidth}
                  height={service.imageHeight}
                  className="h-auto w-[54%] max-w-[300px] transition duration-700 group-hover:scale-[1.045]"
                />
              </div>
            </div>
            <img src={service.trackingImage} width="1" height="1" alt="" className="sr-only" />
            <div className="pt-5 sm:pt-6">
              <h3 className="text-xl font-semibold tracking-normal text-white sm:text-2xl">{service.title}</h3>
            </div>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}
