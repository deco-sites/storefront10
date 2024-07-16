import { type ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  policies?: Item[];
  logo?: ImageWidget;
  trademark?: string;
}

function Footer({ links = [], policies = [], logo, trademark }: Props) {
  return (
    <footer
      class="relative px-5 sm:px-0 mt-0 sm:mt-0"
      style={{ backgroundColor: "#000000" }}
    >
      <div class="container flex flex-col gap-5 sm:gap-10 py-10 relative z-10">
        <div class="flex justify-between">
          <div class="flex flex-nowrap justify-between gap-2 ml-16">
            <div>
              <img loading="lazy" src={logo} />
              <p class="w-3/4 mt-10">
                Desbloqueie um mundo de elegância e vantagens imperdíveis com a Decloths.
              </p>
            </div>
          </div>

          <ul class="grid grid-flow-row sm:grid-flow-col gap-6 mr-24">
            {links.map(({ title, href, children }) => (
              <li class="flex flex-col gap-4 pl-12">
                <a class="text-base font-semibold" href={href}>
                  {title}
                </a>
                <ul class="flex flex-col gap-2">
                  {children.map(({ title, href }) => (
                    <li key={href}>
                      <a class="text-sm font-medium text-base-400" href={href}>
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <hr class="text-base-400 w-11/12 mx-auto" />

        <div class="flex justify-between items-center">
          <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
            {policies.map(({ title, href }) => (
              <li key={href}>
                <a class="text-xs font-medium ml-12" href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>

          <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4 mr-16">
            <span class="text-xs font-normal text-base-400">{trademark}</span>
          </div>
        </div>
      </div>

      <div class="absolute inset-0 z-0">
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <linearGradient id="linear-gradient" x1="100%" y1="0%" x2="20%" y2="0%">
        <stop offset="0%" style="stop-color: #404040; stop-opacity: 0.5;" />
        <stop offset="100%" style="stop-color: #181818; stop-opacity: 0;" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#linear-gradient)" />
  </svg>
</div>


    </footer>
  );
}

export default Footer;
