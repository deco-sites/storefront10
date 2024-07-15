import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  const { price = 0, listPrice, seller = "1", availability } = useOffer(offers);

  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  return (
    <div {...viewItemEvent} class="flex flex-col text-primary" id={id}>
      {/* Price tag */}
      <div>
        <span
          class={clx(
            "text-sm/4 font-normal text-black bg-primary bg-opacity-15 text-center rounded-badge px-2 py-1",
            percent < 1 && "opacity-0",
            "w-fit",
          )}
        >
          {percent} % off
        </span>
      </div>

      <div class="flex justify-between mb-6">
        <div class="flex flex-col items-start">
          <span class={clx("text-2xl font-semibold")}>{title}</span>
          <span>Vendido e Entregue por Decloths</span>
        </div>
        <div class="flex space-x-4">
          <a
            href="#"
            class="flex items-center justify-center w-fit h-10 px-2 bg-pink-100 rounded-lg"
          >
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-pink-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.35l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                </path>
              </svg>
              <span class="text-pink-500">9</span>
            </div>
          </a>
          <a
            href="#"
            class="flex items-center justify-center w-fit h-10 px-2 bg-blue-100 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </a>
        </div>
      </div>

      <hr class="w-full border-gray-300" />

      <div class="flex justify-between mt-4">
        {/* Prices */}
        <div class="flex gap-3 pt-1">
          <span class="text-3xl font-semibold text-base-400 text-success">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          <span class="line-through text-sm font-medium text-gray-400">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
        </div>
        {/* Reviews */}
        <div class="flex items-center space-x-4 flex-col">
          <div class="flex mb-2 w-full justify-end">
            <div class="flex items-center space-x-1 bg-orange-100 p-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-orange-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.161c.969 0 1.371 1.24.588 1.81l-3.373 2.454a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.373-2.454a1 1 0 00-1.175 0l-3.373 2.454c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.3 9.394c-.783-.57-.381-1.81.588-1.81h4.161a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
              <span class="text-orange-500 text-lg font-semibold">4.8</span>
            </div>
            <div class="flex items-center space-x-1 bg-blue-100 p-2 rounded ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 13a1 1 0 01-1 1h-2v2a1 1 0 01-1 1h-8a1 1 0 01-1-1v-2H3a1 1 0 01-1-1V4a1 1 0 011-1h14a1 1 0 011 1v9zM3 6h2v2H3V6zm0 4h2v2H3v-2zm4 0h2v2H7v-2zm0-4h2v2H7V6zm4 0h2v2h-2V6zm0 4h2v2h-2v-2zm4 0h2v2h-2v-2zm0-4h2v2h-2V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-blue-500 text-lg font-semibold">
                67 Reviews
              </span>
            </div>
          </div>
          <div>
            <span class="text-green-500 font-semibold">93%</span>
            <span class="text-gray-600">dos compradores recomendam</span>
          </div>
        </div>
      </div>

      {/* Sku Selector */}
      {hasValidVariants && (
        <div className="mt-4 sm:mt-8">
          <ProductSelector product={product} />
        </div>
      )}

      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="btn btn-primary no-animation"
                disabled={false}
              />
              {/* <WishlistButton item={item} /> */}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>

      {/* Shipping Simulation */}
      {
        /* <div class="mt-8">
        <ShippingSimulationForm
          items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
        />
      </div> */
      }

      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Description</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
