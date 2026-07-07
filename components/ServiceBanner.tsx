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

      <div className="mx-auto grid max-w-5xl items-start gap-x-9 gap-y-10 md:grid-cols-3">
        {SERVICES.map((service) => (
          <a
            key={service.title}
            href={service.href}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            aria-label={`${service.title}を別タブで開く`}
            className="group scroll-reveal block transition duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
          >
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                width={service.imageWidth}
                height={service.imageHeight}
                className="h-auto w-full rounded-[1rem] shadow-[0_22px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_34px_100px_rgba(0,0,0,0.34)] group-hover:ring-white/18"
              />
            ) : (
              <span className="block py-3 text-2xl font-semibold tracking-normal text-white transition duration-300 group-hover:text-cyan-100 sm:text-3xl">
                {service.title}
              </span>
            )}
            <img src={service.trackingImage} width="1" height="1" alt="" className="sr-only" />
          </a>
        ))}
      </div>
    </section>
  );
}
