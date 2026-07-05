import Image from "next/image";
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
            rel="noreferrer"
            aria-label={`${service.title}を別タブで開く`}
            className="group scroll-reveal block rounded-[1.6rem] border border-white/12 bg-white/[0.08] p-2.5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.11] hover:shadow-[0_34px_100px_rgba(0,0,0,0.26)] active:translate-y-0 active:scale-[0.98]"
          >
            <div className="rounded-[1.25rem] bg-white/[0.06] p-1.5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-white/[0.06]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 30vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
              </div>
            </div>
            <div className="px-3 py-4">
              <h3 className="text-base font-semibold tracking-normal text-white sm:text-lg">{service.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
