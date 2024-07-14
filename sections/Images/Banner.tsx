import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  title: string;
  description?: HTMLWidget;
  width?: number;
  height?: number;

  images: {
    mobile: ImageWidget;
    desktop: ImageWidget;
  };

  cta?: {
    href: string;
    label: string;
  };
}

function Banner({ title, description, images, cta, width, height }: Props) {
  return (
    <Section.Container>
      {/* mx-5 sm:mx-0 */}
      <div class="bg-transparent h-full">
        <Picture>
          <Source
            media="(max-width: 640px)"
            src={images.mobile}
            width={335}
            height={572}
          />
          <Source
            media="(min-width: 640px)"
            src={images.desktop}
            width={width || 1320}
            height={height || 480}
          />
          <img
            src={images.desktop}
            alt={title}
            class="w-full h-auto object-scale-down"
          />
        </Picture>

        <div
          class={clx(
            "absolute left-0 top-0",
            "p-5 sm:p-10 md:py-20 md:px-[60px]",
            "flex flex-col",
            "h-full max-w-full sm:max-w-[33%] md:max-w-[50%] justify-center",
          )}
        >
          {title && <span class="font-bold text-7xl text-primary">{title}
          </span>}
          {description && (
            <span
              class="font-normal text-sm md: pt-4 pb-12"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          <div class="">
            {cta && (
              <a
                href={cta.href}
                class="btn btn-primary no-animatio w-fit border-0 min-w-[180px]"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </Section.Container>
  );
}

export default Banner;
