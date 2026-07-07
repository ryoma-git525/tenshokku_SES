import { SERVICES } from "@/lib/constants";

export function ServiceBanner() {
  return (
    <section className="mx-auto max-w-6xl pb-32 pt-28 sm:pt-40">
      <div className="scroll-reveal mx-auto mb-14 max-w-2xl text-left sm:mb-16">
        <p className="text-lg font-medium leading-9 text-white/72">
          この診断で変わるのは、仕事ではありません。
          <br />
          「自分にはこんな選択肢もあるんだ。」そう思える求人を、少しだけのぞいてみませんか。
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.18fr_0.82fr]">
        {SERVICES.map((service) => (
          <a
            key={service.title}
            href={service.href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            aria-label={`${service.title}を別タブで開く`}
            className={[
              "group scroll-reveal relative block overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.075] shadow-[0_26px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1.5 hover:border-white/24 hover:bg-white/[0.105] hover:shadow-[0_42px_130px_rgba(0,0,0,0.32)] active:translate-y-0 active:scale-[0.98]",
              service.featured ? "p-3.5 lg:row-span-2" : "p-3"
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-100/10 blur-3xl transition duration-500 group-hover:bg-cyan-100/16"
            />

            <div className="relative rounded-[1.55rem] border border-white/10 bg-white/[0.045] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div
                className={[
                  "flex items-center justify-center overflow-hidden rounded-[1.25rem] bg-[linear-gradient(145deg,#fffdfa_0%,#f7fafc_58%,#eef6f8_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_70px_rgba(0,0,0,0.20)]",
                  service.featured ? "aspect-[1.62/1] lg:aspect-[1.42/1]" : "aspect-[2.25/1]"
                ].join(" ")}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  width={service.imageWidth}
                  height={service.imageHeight}
                  className={[
                    "h-auto transition duration-700 group-hover:scale-[1.04]",
                    service.featured ? "w-[58%] max-w-[320px]" : "w-[52%] max-w-[220px]"
                  ].join(" ")}
                />
              </div>
            </div>
            <img src={service.trackingImage} width="1" height="1" alt="" className="sr-only" />
            <div className={service.featured ? "px-4 pb-5 pt-6 lg:pt-8" : "px-3 pb-4 pt-5"}>
              <h3 className={service.featured ? "text-2xl font-semibold tracking-normal text-white sm:text-3xl" : "text-lg font-semibold tracking-normal text-white"}>
                {service.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
