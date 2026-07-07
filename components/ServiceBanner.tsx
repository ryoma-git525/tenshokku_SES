import { SERVICES } from "@/lib/constants";

export function ServiceBanner() {
  return (
    <section className="mx-auto max-w-5xl pb-32 pt-28 sm:pt-36">
      <div className="scroll-reveal mx-auto mb-12 max-w-2xl text-left">
        <p className="text-lg font-medium leading-9 text-white/72">
          この診断で変わるのは、仕事ではありません。
          <br />
          「自分にはこんな選択肢もあるんだ。」そう思える求人を、少しだけのぞいてみませんか。
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {SERVICES.map((service) => (
          <a
            key={service.title}
            href={service.href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            aria-label={`${service.title}を別タブで開く`}
            className="group scroll-reveal block overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.085] hover:shadow-[0_34px_100px_rgba(0,0,0,0.24)] active:translate-y-0 active:scale-[0.98]"
          >
            <div className="p-2.5">
              <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-[1.05rem] bg-[linear-gradient(145deg,#fffdfa_0%,#f7fafc_58%,#eef5f7_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    width={service.imageWidth}
                    height={service.imageHeight}
                    className="h-auto w-[76%] max-w-[320px] transition duration-700 group-hover:scale-[1.035]"
                  />
                ) : (
                  <span className="px-8 text-center text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
                    {service.title}
                  </span>
                )}
              </div>
            </div>
            <img src={service.trackingImage} width="1" height="1" alt="" className="sr-only" />
            <div className="px-5 pb-5 pt-3">
              {service.image ? (
                <h3 className="text-base font-semibold tracking-normal text-white sm:text-lg">{service.title}</h3>
              ) : (
                <span className="block h-7" aria-hidden="true" />
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
