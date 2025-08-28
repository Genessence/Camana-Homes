import React from "react";
import { API } from "@shared/api";
import type { ArticleCard, PropertyCard } from "@shared/api.types";
import { Link, useParams } from "react-router-dom";
import { Mail, Facebook, Instagram, Linkedin, Twitter, ArrowLeft, ArrowRight, Eye, Bed, Bath } from "lucide-react";

const PUBLIC_IMAGE_FALLBACK = "https://camana-homes.s3.ap-south-1.amazonaws.com/properties/dubai-marina/2200xxs%20(1).webp";

const ArticleV2 = () => {
  const [article, setArticle] = React.useState<ArticleCard | null>(null);
  const [related, setRelated] = React.useState<PropertyCard[] | null>(null);
  const [featuredProperty, setFeaturedProperty] = React.useState<PropertyCard | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { slug } = useParams<{ slug?: string }>();

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (slug) {
          const [a, props] = await Promise.all([
            API.articles.bySlug(slug),
            API.properties.trending(2),
          ]);
          if (!mounted) return;
          setArticle(a as any as ArticleCard);
          setRelated(props ?? []);
        } else {
          const [articles, props] = await Promise.all([
            API.articles.list(1),
            API.properties.trending(2),
          ]);
          if (!mounted) return;
          setArticle(articles?.[0] ?? null);
          setRelated(props ?? []);
        }
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [slug]);

  // Fetch full listing data for featured property if article provides a slug
  React.useEffect(() => {
    let mounted = true;
    const doFetch = async () => {
      try {
        const fp: any = article?.featured_property;
        const fpSlug: string | undefined = fp?.slug || fp?.property_slug || fp?.listing_slug;
        if (fpSlug) {
          const full = await API.properties.bySlug(fpSlug);
          if (!mounted) return;
          setFeaturedProperty(full);
        } else {
          setFeaturedProperty(null);
        }
      } catch {
        setFeaturedProperty(null);
      }
    };
    doFetch();
    return () => { mounted = false; };
  }, [article?.featured_property]);

  console.log(article);

  const SectionSkeleton = (
    <div className="animate-pulse">
      <div className="h-[40px] w-[220px] bg-gray-200 mb-4" />
      <div className="h-[56px] w-[90%] bg-gray-200 mb-3" />
      <div className="h-[18px] w-[80%] bg-gray-200 mb-2" />
      <div className="h-[18px] w-[60%] bg-gray-200" />
      <div className="h-[400px] bg-gray-200 mt-6" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero + Header spacing is handled globally */}
      <div className="px-4 lg:px-[70px] py-[30px] flex flex-col items-center">
        <div className="w-full max-w-[1460px] flex flex-col items-center gap-5">
          {loading || !article ? (
            SectionSkeleton
          ) : (
            <>
              {/* Category pill */}
              {article.category && (
                <div className="px-3 py-2 bg-red-accent"><span className="text-white font-dm-sans font-bold text-[18px]">{article.category}</span></div>
              )}
              {/* Title */}
              <h1 className="text-black text-center font-dm-sans text-[35px] lg:text-[47px] font-bold leading-tight uppercase max-w-[1100px]">
                {article.title}
              </h1>
              {/* Meta */}
              <div className="font-dm-sans text-[16px] text-black">
                {article.author_name && <span className="font-bold">By {article.author_name}</span>}
                {article.published_at && <span className="font-normal"> — {new Date(article.published_at).toLocaleDateString()}</span>}
              </div>
              {/* Hero Image */}
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-[400px] lg:h-[725px] object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = PUBLIC_IMAGE_FALLBACK; }}
              />
            </>
          )}
        </div>
      </div>

      {/* Body + Share */}
      <div className="px-4 lg:px-[70px] pb-[40px] flex justify-center">
        <div className="w-full max-w-[1460px] grid grid-cols-1 lg:grid-cols-[145px_1fr] gap-[20px]">
          {/* Share sidebar */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-[14px] lg:sticky lg:top-[20px] h-fit">
            <h3 className="font-inter text-[16px] font-bold text-black">Share to:</h3>
            <div className="flex flex-row lg:flex-col gap-[7px]">
              {[Mail, Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <div key={i} className="flex items-center justify-center w-[56px] h-[56px] rounded-full border border-black/16 hover:bg-gray-100 cursor-pointer transition-colors">
                  <Icon className="w-[22px] h-[22px] text-black" />
                </div>
              ))}
            </div>
          </div>

          {/* Article body */}
          <div className="flex-1 flex flex-col gap-[20px]">
            {loading || !article ? (
              <>
                <div className="h-[120px] bg-gray-100 animate-pulse" />
                <div className="h-[240px] bg-gray-100 animate-pulse" />
                <div className="h-[18px] bg-gray-100 animate-pulse w-4/5" />
              </>
            ) : (
              <>
                {/* Body with right rail (reading time) */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-[20px] items-start">
                  <div className="flex flex-col gap-[16px]">
                    {article.excerpt && (
                      <p className="text-[#3D3E3F] font-dm-sans text-[18px] leading-[30px] font-bold">{article.excerpt}</p>
                    )}
                    {article.body && (
                      <div
                        className="prose max-w-none text-[#3D3E3F] font-dm-sans text-[18px] leading-[30px]"
                        dangerouslySetInnerHTML={{ __html: article.body }}
                      />
                    )}
                  </div>

                  {/* Right rail: Reading time */}
                  <aside className="w-full lg:sticky lg:top-[20px] h-fit bg-[#F5F5F5] rounded-md p-4">
                    <div className="text-[14px] font-dm-sans font-bold text-[#333] mb-2">10 Minute read</div>
                    <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#555]">
                      <li>Lorem Ipsum is simply dummy text of the printing</li>
                      <li>Lorem Ipsum has been the industry standard dummy text</li>
                      <li>It has survived not only five centuries</li>
                    </ul>
                  </aside>
                  {/* Two cards under left column width */}
                  <div className="lg:col-start-1 lg:col-end-2 grid grid-cols-1 gap-[20px] mt-[20px]">
                  {([featuredProperty].filter(Boolean) as PropertyCard[]).concat(
                    !featuredProperty && related && related.length > 0 ? [related[0]] : []
                  ).slice(0,1).map((p) => (
                    <Link
                      key={p.id}
                      to={`/listing/${p.slug}`}
                      className="w-full bg-white border-[8px] border-white block overflow-hidden shadow hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-[220px] w-full overflow-hidden">
                        <img
                          src={(p as any).primary_image_url}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PUBLIC_IMAGE_FALLBACK; }}
                        />
                        <div className="absolute top-[10px] left-[9px] flex gap-[10px]">
                          <div className="flex items-center gap-[6px] px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px]">
                            <Eye className="w-[18px] h-[18px] text-white" />
                            <span className="text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                              {new Intl.NumberFormat().format((p as any).views_count || 0)}
                            </span>
                          </div>
                          {(p as any).has_virtual_tour && (
                            <div className="px-[9.681px] py-[8.471px] border border-white bg-black/10 backdrop-blur-[8px] text-white font-dm-sans text-[13.391px] font-medium leading-[17.14px]">
                              Virtual Tours
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col gap-[11px]">
                        <div className="flex items-center justify-between">
                          <div className="font-dm-sans text-[23.607px] font-semibold text-black leading-[28.328px] tracking-[-0.472px]">
                            {(() => {
                              const amount = (p as any).price_amount ?? 0;
                              const currency = (p as any).price_currency || 'USD';
                              if (!amount || amount <= 0) return 'Price on Request';
                              try { return new Intl.NumberFormat(undefined, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount); }
                              catch { return `${currency} ${Math.round(amount).toLocaleString()}`; }
                            })()}
                          </div>
                          <div className="flex items-center gap-[5px]">
                            <ArrowRight className="w-[10px] h-[5px] text-[#999] transform -rotate-90" />
                          </div>
                        </div>
                        <h3 className="font-dm-sans text-[17.705px] font-normal text-black leading-[21.246px] tracking-[-0.354px]">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-[10px] text-[12.8px] font-normal text-black">
                          <span>{(p as any).property_type}</span>
                          <span>|</span>
                          <div className="flex items-center gap-[2px]">
                            <Bed className="w-[17.705px] h-[17.705px]" />
                            <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                              {(p as any).bedrooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-[2px]">
                            <Bath className="w-[17.705px] h-[17.705px]" />
                            <span className="font-plus-jakarta text-[11.803px] leading-[17.705px] tracking-[-0.236px]">
                              {(p as any).bathrooms}
                            </span>
                          </div>
                          <span>|</span>
                          <span>
                            Area : {(p as any).area_value} {(p as any).area_unit}
                          </span>
                        </div>
                        <div className="h-[1px] bg-gray-light"></div>
                        <div className="flex items-center justify-between">
                          {(p as any).agent ? (
                            <div className="flex items-center gap-[5px]">
                              <img
                                src={(p as any).agent?.avatar_url || "https://api.builder.io/api/v1/image/assets/TEMP/21584c4a5fb695a4f53c9f609c46424507f3b08c?width=98"}
                                alt={(p as any).agent?.name || "Agent"}
                                className="w-[49px] h-[49px] rounded-full"
                              />
                              <div>
                                <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                                  {(p as any).agent?.name}
                                </div>
                                <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                                  {(p as any).agent?.agency?.name}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-[5px]">
                              <img
                                src={(p as any).developer_logo_url || "https://via.placeholder.com/98x98/f3f4f6/9ca3af?text=Dev"}
                                alt={(p as any).developer || "Developer"}
                                className="w-[49px] h-[49px] rounded-full object-contain bg-white"
                              />
                              <div>
                                <div className="font-dm-sans text-[16px] font-semibold italic text-black">
                                  Direct from Developer
                                </div>
                                <div className="font-dm-sans text-[12px] font-normal italic text-[#666]">
                                  {(p as any).developer || ""}
                                </div>
                              </div>
                            </div>
                          )}
                          {(p as any).agent?.agency?.logo_url ? (
                            <img
                              src={(p as any).agent.agency.logo_url}
                              alt="Company Logo"
                              className="w-[73px] h-[26px]"
                            />
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="w-full bg-black py-[40px] px-4 lg:px-[70px] mt-[40px]">
        <div className="max-w-[1460px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-[40px] p-[30px] lg:p-[50px] border border-white/20">
            {/* Avatar */}
            <img
              src={(article?.author_avatar_url as string) || PUBLIC_IMAGE_FALLBACK}
              alt={article?.author_name || "Author"}
              className="w-[200px] lg:w-[325px] h-[300px] lg:h-[527px] object-cover bg-white/10"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = PUBLIC_IMAGE_FALLBACK; }}
            />

            {/* Details */}
            <div className="flex flex-col gap-[20px] text-white w-full">
              <h2 className="font-montserrat text-[24px] lg:text-[28px] font-bold">
                {article?.author_name ? `Written by ${article.author_name}` : "Author"}
              </h2>
              <p className="font-dm-sans text-[17px] font-medium leading-[25px] opacity-80">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock looked up
                one of the more obscure Latin words, consectetur, and discovered the undoubtable source. Lorem Ipsum
                comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by Cicero.
              </p>
              {article?.author_name && (
                <Link
                  to="/journal"
                  className="text-red-400 underline underline-offset-4 hover:text-red-300 w-fit"
                >
                  Read More articles by {article.author_name} →
                </Link>
              )}
              <div className="flex items-center gap-[15px] mt-[10px] text-black">
                <a href="#" className="w-[40px] h-[40px] rounded-full bg-white grid place-items-center">🌐</a>
                <a href="#" className="w-[40px] h-[40px] rounded-full bg-white grid place-items-center">📷</a>
                <a href="#" className="w-[40px] h-[40px] rounded-full bg-white grid place-items-center">in</a>
                <a href="#" className="w-[40px] h-[40px] rounded-full bg-white grid place-items-center">▶</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleV2;


