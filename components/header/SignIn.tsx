import { useScript } from "deco/hooks/useScript.ts";
import { useId } from "../../sdk/useId.ts";

const onLoad = (containerID: string) => {
  window.STOREFRONT.USER.subscribe((sdk) => {
    const container = document.getElementById(containerID) as HTMLDivElement;

    const nodes = container.querySelectorAll<HTMLAnchorElement>("a");

    const login = nodes.item(0);
    const account = nodes.item(1);

    const user = sdk.getUser();

    if (user?.email) {
      login.classList.add("hidden");
      account.classList.remove("hidden");
    } else {
      login.classList.remove("hidden");
      account.classList.add("hidden");
    }
  });
};

function SignIn() {
  const id = useId();

  return (
    <div id={id}>
      <a href="/login" aria-label="Login">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_2_3657"
            style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="25"
          >
            <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_2_3657)">
            <path
              d="M12 12.5C10.9 12.5 9.95833 12.1083 9.175 11.325C8.39167 10.5417 8 9.6 8 8.5C8 7.4 8.39167 6.45833 9.175 5.675C9.95833 4.89167 10.9 4.5 12 4.5C13.1 4.5 14.0417 4.89167 14.825 5.675C15.6083 6.45833 16 7.4 16 8.5C16 9.6 15.6083 10.5417 14.825 11.325C14.0417 12.1083 13.1 12.5 12 12.5ZM4 20.5V17.7C4 17.1333 4.14583 16.6125 4.4375 16.1375C4.72917 15.6625 5.11667 15.3 5.6 15.05C6.63333 14.5333 7.68333 14.1458 8.75 13.8875C9.81667 13.6292 10.9 13.5 12 13.5C13.1 13.5 14.1833 13.6292 15.25 13.8875C16.3167 14.1458 17.3667 14.5333 18.4 15.05C18.8833 15.3 19.2708 15.6625 19.5625 16.1375C19.8542 16.6125 20 17.1333 20 17.7V20.5H4ZM6 18.5H18V17.7C18 17.5167 17.9542 17.35 17.8625 17.2C17.7708 17.05 17.65 16.9333 17.5 16.85C16.6 16.4 15.6917 16.0625 14.775 15.8375C13.8583 15.6125 12.9333 15.5 12 15.5C11.0667 15.5 10.1417 15.6125 9.225 15.8375C8.30833 16.0625 7.4 16.4 6.5 16.85C6.35 16.9333 6.22917 17.05 6.1375 17.2C6.04583 17.35 6 17.5167 6 17.7V18.5ZM12 10.5C12.55 10.5 13.0208 10.3042 13.4125 9.9125C13.8042 9.52083 14 9.05 14 8.5C14 7.95 13.8042 7.47917 13.4125 7.0875C13.0208 6.69583 12.55 6.5 12 6.5C11.45 6.5 10.9792 6.69583 10.5875 7.0875C10.1958 7.47917 10 7.95 10 8.5C10 9.05 10.1958 9.52083 10.5875 9.9125C10.9792 10.3042 11.45 10.5 12 10.5Z"
              fill="#757575"
            />
          </g>
        </svg>
      </a>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default SignIn;
