import { type ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy title */
interface Item {
  title: string;
  href: string;
}
//
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
      class="px-5 sm:px-0 mt-2 sm:mt-2"
      style={{ backgroundColor: "#131313" }}
    >
      <div class="container flex flex-col gap-5 sm:gap-10 py-10">
        <div class="flex justify-between">
          <div class="flex flex-nowrap justify-between gap-4">
            <div>
              <img loading="lazy" src={logo} />
              <p class="w-3/4 mt-10">
                Desbloqueie um mundo de elegância e vantagens imperdíveis com a
                Decloths.
              </p>
            </div>
          </div>

          <ul class="grid grid-flow-row sm:grid-flow-col gap-6 ">
            {links.map(({ title, href, children }) => (
              <li class="flex flex-col gap-4 pl-12">
                <a class="text-base font-semibold" href={href}>
                  {title}
                </a>
                <ul class="flex flex-col gap-2">
                  {children.map(({ title, href }) => (
                    <li>
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

        <hr class="w-full text-base-400" />

        <div class="flex justify-between items-center">
          <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
            {policies.map(({ title, href }) => (
              <li>
                <a class="text-xs font-medium" href={href}>
                  {title}
                </a>
              </li>
            ))}
          </ul>

          <div class="flex flex-nowrap items-center justify-between sm:justify-center gap-4">
            <span class="text-xs font-normal text-base-400">{trademark}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
