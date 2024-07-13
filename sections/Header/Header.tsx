import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import SignIn from "../../components/header/SignIn.tsx";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
  alerts?: HTMLWidget[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo: Logo;

  /** @hide true */
  variant?: "initial" | "menu";
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = ({ navItems, logo, searchbar }: Props) => (
  <div class="bg-primary">
    <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container text-primary bg-base bg-opacity-30 backdrop-blur-md rounded"
        style={{ marginTop: HEADER_HEIGHT_MOBILE }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>

    <div class="flex flex-col gap-2 pt-5 container">
      <div class="flex justify-end items-center">
        <div height={14.25} class="flex px-2">
          <Image
            src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11551/7fd455b4-88a8-4031-909a-44571b7a1b71"
            alt="Brasil flag"
            width={19}
          />
        </div>
        <a href="#">Brasil | Real</a>
        <a href="#">
          <p class="text-2xl relative -top-1">⌄</p>
        </a>
      </div>
      <div class="grid grid-cols-3 place-items-center">
        <div class="place-self-start mr-2">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 334}
              height={logo.height || 41}
            />
          </a>
        </div>

        <label
          for={SEARCHBAR_POPUP_ID}
          class="bg-base-content rounded-lg input input-bordered flex justify-between items-center w-full cursor-text h-full"
          aria-label="search icon button"
        >
          <div class="flex justify-between w-full">
            <span class="text-primary truncate inset-0">Search items...</span>
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.41196 12.0999L1.92259 16.5892C1.59715 16.9147 1.06951 16.9147 0.744078 16.5892C0.418641 16.2638 0.418641 15.7362 0.744078 15.4107L5.23345 10.9214C4.3559 9.79246 3.83333 8.37392 3.83333 6.83332C3.83333 3.15142 6.8181 0.166656 10.5 0.166656C14.1819 0.166656 17.1667 3.15142 17.1667 6.83332C17.1667 10.5152 14.1819 13.5 10.5 13.5C8.95941 13.5 7.54087 12.9774 6.41196 12.0999ZM10.5 11.8333C13.2614 11.8333 15.5 9.59475 15.5 6.83332C15.5 4.0719 13.2614 1.83332 10.5 1.83332C7.73858 1.83332 5.5 4.0719 5.5 6.83332C5.5 9.59475 7.73858 11.8333 10.5 11.8333Z"
                fill="#131313"
              />
            </svg>
          </div>
        </label>

        <div class="flex items-center gap-4 place-self-end h-full">
          <a href="#">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_2_3625"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="25"
              >
                <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2_3625)">
                <path
                  d="M12 21.5L10.55 20.2C8.86667 18.6833 7.475 17.375 6.375 16.275C5.275 15.175 4.4 14.1875 3.75 13.3125C3.1 12.4375 2.64583 11.6333 2.3875 10.9C2.12917 10.1667 2 9.41666 2 8.64999C2 7.08333 2.525 5.77499 3.575 4.72499C4.625 3.67499 5.93333 3.14999 7.5 3.14999C8.36667 3.14999 9.19167 3.33333 9.975 3.69999C10.7583 4.06666 11.4333 4.58333 12 5.24999C12.5667 4.58333 13.2417 4.06666 14.025 3.69999C14.8083 3.33333 15.6333 3.14999 16.5 3.14999C18.0667 3.14999 19.375 3.67499 20.425 4.72499C21.475 5.77499 22 7.08333 22 8.64999C22 9.41666 21.8708 10.1667 21.6125 10.9C21.3542 11.6333 20.9 12.4375 20.25 13.3125C19.6 14.1875 18.725 15.175 17.625 16.275C16.525 17.375 15.1333 18.6833 13.45 20.2L12 21.5ZM12 18.8C13.6 17.3667 14.9167 16.1375 15.95 15.1125C16.9833 14.0875 17.8 13.1958 18.4 12.4375C19 11.6792 19.4167 11.0042 19.65 10.4125C19.8833 9.82083 20 9.23333 20 8.64999C20 7.64999 19.6667 6.81666 19 6.14999C18.3333 5.48333 17.5 5.14999 16.5 5.14999C15.7167 5.14999 14.9917 5.37083 14.325 5.81249C13.6583 6.25416 13.2 6.81666 12.95 7.49999H11.05C10.8 6.81666 10.3417 6.25416 9.675 5.81249C9.00833 5.37083 8.28333 5.14999 7.5 5.14999C6.5 5.14999 5.66667 5.48333 5 6.14999C4.33333 6.81666 4 7.64999 4 8.64999C4 9.23333 4.11667 9.82083 4.35 10.4125C4.58333 11.0042 5 11.6792 5.6 12.4375C6.2 13.1958 7.01667 14.0875 8.05 15.1125C9.08333 16.1375 10.4 17.3667 12 18.8Z"
                  fill="#757575"
                />
              </g>
            </svg>
          </a>
          <SignIn />
          <a href="#">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_2_3651"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="25"
              >
                <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2_3651)">
                <path
                  d="M7.3 21.5C6.66667 21.5 6.125 21.2708 5.675 20.8125C5.225 20.3542 5 19.8083 5 19.175V9.9L3.175 5.5H1V3.5H4.525L6.175 7.5H20.95C21.3333 7.5 21.625 7.65833 21.825 7.975C22.025 8.29167 22.0333 8.61667 21.85 8.95L19 14.525C19.85 14.6583 20.5625 15.05 21.1375 15.7C21.7125 16.35 22 17.1167 22 18C22 18.9667 21.6625 19.7917 20.9875 20.475C20.3125 21.1583 19.4917 21.5 18.525 21.5C17.5417 21.5 16.7125 21.1583 16.0375 20.475C15.3625 19.7917 15.025 18.9667 15.025 18C15.025 17.6667 15.0667 17.3583 15.15 17.075C15.2333 16.7917 15.35 16.5167 15.5 16.25L12.225 15.95L9.225 20.45C9.00833 20.7833 8.72917 21.0417 8.3875 21.225C8.04583 21.4083 7.68333 21.5 7.3 21.5ZM16.85 14.375L19.325 9.5H7L8.25 12.5C8.38333 12.8333 8.59583 13.1125 8.8875 13.3375C9.17917 13.5625 9.51667 13.6917 9.9 13.725L16.85 14.375ZM7.325 19.475C7.35833 19.475 7.43333 19.4333 7.55 19.35L9.975 15.75C9.15833 15.6667 8.51667 15.4708 8.05 15.1625C7.58333 14.8542 7.23333 14.5333 7 14.2V19.2C7 19.2833 7.03333 19.35 7.1 19.4C7.16667 19.45 7.24167 19.475 7.325 19.475ZM18.5 19.5C18.9333 19.5 19.2917 19.3542 19.575 19.0625C19.8583 18.7708 20 18.4167 20 18C20 17.5667 19.8583 17.2083 19.575 16.925C19.2917 16.6417 18.9333 16.5 18.5 16.5C18.0833 16.5 17.7292 16.6417 17.4375 16.925C17.1458 17.2083 17 17.5667 17 18C17 18.4167 17.1458 18.7708 17.4375 19.0625C17.7292 19.3542 18.0833 19.5 18.5 19.5Z"
                  fill="#757575"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <ul class="flex">
          {navItems?.slice(0, 10).map((item, i) => (
            <NavItem
              item={item}
              i={i}
            />
          ))}
        </ul>
        <div>{/* ship to */}</div>
      </div>
    </div>
  </div>
);

const Mobile = ({ logo, searchbar }: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-screen overflow-y-auto">
            <Searchbar {...searchbar} />
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
            style={{ minWidth: "100vw" }}
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />

    <div
      class="grid place-items-center w-screen px-5 gap-4"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content auto min-content min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
        hx-target={`#${SIDEMENU_CONTAINER_ID}`}
        hx-swap="outerHTML"
        hx-trigger="click once"
        hx-get={useSection({ props: { variant: "menu" } })}
      >
        <Icon id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 100}
            height={logo.height || 13}
          />
        </a>
      )}

      <label
        for={SEARCHBAR_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="search icon button"
      >
        <Icon id="search" />
      </label>
      <Bag />
    </div>
  </>
);

function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <header
      style={{
        height: device === "desktop" ? "7rem" : HEADER_HEIGHT_MOBILE,
      }}
    >
      <div class="bg-base-100 fixed w-full z-40">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
      </div>
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}
