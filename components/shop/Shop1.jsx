"use client";
import { useContextElement } from "@/context/Context";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";

export default function Shop1() {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  return (
    <div className="section py-4 lg:py-6 xl:py-8">
      <div className="container max-w-xl">
        <div className="panel vstack gap-4 lg:gap-6 xl:gap-8">
          <header className="shop-header panel vstack justify-center gap-2 lg:gap-4 text-center">
            <div className="panel">
              <h1 className="h3 lg:h1 m-0">Liste des produits</h1>
            </div>
            <div className="vstack sm:hstack justify-between items-center gap-2 sm:gap-4">
              <div className="panel text-center sm:text-start">
                <span className="fs-6 m-0 opacity-60">
                  Affichage de 16 produits sur 100 au total.
                </span>
              </div>
              <div>
                <div className="hstack gap-1 fs-6">
                  <span>Filtrer par :</span>
                  <select
                    name="select"
                    id="filter_by"
                    className="form-select form-control-xs fs-6 w-150px dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  >
                    <option value="">Plus récents</option>
                    <option value="">Pertinence</option>
                    <option value="">Plus populaires</option>
                    <option value="">Tendances</option>
                    <option value="">Note</option>
                  </select>
                </div>
              </div>
            </div>
          </header>
          <div className="shop-lisiting row child-cols-6 lg:child-cols-3 col-match gy-4 lg:gy-8 gx-2 lg:gx-4">
            {products.map((product) => (
              <div key={product.id}>
                <article className="product type-product panel">
                  <div className="vstack gap-2">
                    <div className="panel">
                      <figure className="featured-image m-0 rounded ratio ratio-3x4 overflow-hidden uc-transition-toggle overflow-hidden">
                        <Image
                          className="media-cover image uc-transition-scale-up uc-transition-opaque"
                          src={product.image}
                          width={1280}
                          height={1707}
                          alt={product.alt}
                        />
                        <Link
                          href={`/shop-product-detail/${product.id}`}
                          className="position-cover"
                          data-caption={product.title}
                        ></Link>
                      </figure>
                      <a
                        href="#add_to_favorite"
                        className="btn btn-md btn-alt-gray-200 hover:bg-primary w-32px h-32px p-0 rounded-circle shadow-xs position-absolute top-0 end-0 m-1 md:m-2"
                      >
                        <i className="icon icon-narrow unicon-favorite-filled" />
                      </a>
                      {product.discount && (
                        <span className="position-absolute top-0 start-0 m-1 md:m-2 ft-tertiary h-24px px-1 bg-yellow-400 text-dark">
                          {product.discount}
                        </span>
                      )}
                    </div>
                    <div className="content vstack items-center gap-1 fs-6 text-center xl:mt-1">
                      <h5 className="h6 md:h5 m-0">
                        <Link
                          className="text-none"
                          href={`/shop-product-detail/${product.id}`}
                        >
                          {product.title}
                        </Link>
                      </h5>
                      <ul
                        className="nav-x gap-0 text-gray-100 dark:text-gray-700"
                        title={`Average ${product.rating} out of 5`}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <li key={index}>
                            <i
                              className={`icon fs-6 unicon-star-filled ${
                                index < product.rating ? "text-yellow" : ""
                              }`}
                            />
                          </li>
                        ))}
                      </ul>
                      <div className="hstack justify-center gap-narrow fs-7">
                        {product.oldPrice && (
                          <span className="price-old text-line-through opacity-40">
                            ${product.oldPrice?.toFixed(2)}
                          </span>
                        )}
                        <span className="price">
                          ${product.price?.toFixed(2)}
                        </span>
                      </div>
                      <a
                        className="btn btn-text text-none text-primary border-bottom fs-7 lg:fs-6 mt-1 pb-narrow"
                        onClick={() => addProductToCart(product.id)}
                      >
                        {isAddedToCartProducts(product.id)
                          ? "Déjà ajouté"
                          : "Ajouter au panier"}
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
