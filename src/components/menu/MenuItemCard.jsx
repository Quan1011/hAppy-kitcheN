import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { allergenLegend, additiveLegend } from '../../data/menuData'

// Tự động lấy toàn bộ ảnh .jpg trong thư mục image để map theo mã món
const dishImages = import.meta.glob('../../image/*.{png,jpg,jpeg,webp,svg,PNG,JPG}', {
  eager: true,
  import: 'default',
})

const imageMap = Object.keys(dishImages).reduce((acc, path) => {
  const fileName = path.split('/').pop().replace(/\.[^/.]+$/, ""); // Lấy tên file bỏ đuôi
  acc[fileName] = dishImages[path];
  return acc;
}, {});

const tagMetaConfig = {
  vegan: { icon: '🥬', className: 'bg-[#dff6dd] text-[#1f4b33] border-[#b4deb5]' },
  spicy: { icon: '🌶️', className: 'bg-[#ffe1db] text-[#7b2b23] border-[#ffbfb3]' },
}

const getCodeBadges = (codesArray = [], legend = {}, t, isAdditive = false) =>
  (codesArray ?? []).map(code => {
    const translationKey = isAdditive ? `legend.additivesList.${code}` : `legend.allergens.${code}`
    const translatedLabel = t ? t(translationKey, { defaultValue: legend[code] ?? code.toUpperCase() }) : (legend[code] ?? code.toUpperCase())
    return (
      <span
        key={code}
        className='text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border border-[#cfe6d2] text-[#1f4b33] bg-[#f5fbf3]'
        title={translatedLabel}
      >
        {code.toUpperCase()}
      </span>
    )
  })

const splitParenthetical = text => {
  if (!text) return { main: '', paren: '' }
  const match = text.match(/^(.*?)(\s*\([^)]*\))$/)
  if (!match) return { main: text, paren: '' }
  return { main: match[1].trimEnd(), paren: match[2].trimStart() }
}

const MenuItemCard = ({ item, fallbackImage }) => {
  const { t } = useTranslation()
  const tagMeta = useMemo(
    () => ({
      vegan: { ...tagMetaConfig.vegan },
      spicy: { ...tagMetaConfig.spicy },
    }),
    [t],
  )

  const tagList = item.tags ?? []
  const hasVariations = Array.isArray(item.variations) && item.variations.length > 0

  // ưu tiên: ảnh gắn trực tiếp cho item > ảnh theo mã món > ảnh fallback của section
  const codeImage = item.code ? imageMap[item.code] : null;

  let variationImage = null;
  if (!item.image && !codeImage && Array.isArray(item.variations)) {
    // .find() sẽ nhanh và gọn hơn dùng vòng lặp for truyền thống
    const foundVariation = item.variations.find(v => v?.code && imageMap[v.code]);
    if (foundVariation) {
      variationImage = imageMap[foundVariation.code];
    }
  }

  const imageSrc = item.image ?? codeImage ?? variationImage ?? fallbackImage ?? null
  const hasImage = Boolean(imageSrc)

  // Get translated name and description
  const itemKey = `menu.items.${item.code}`
  const translatedName = t(`${itemKey}.name`, { defaultValue: item.name })
  const translatedDescription = t(`${itemKey}.description`, { defaultValue: item.description })
  const nameParts = splitParenthetical(translatedName)

  const renderInlineInfo = ({ tags = [], allergens = [], additives = [], align = 'start', keyPrefix = 'main' }) => {
    const tagChips = tags.map(tag => {
      const meta = tagMeta[tag]
      if (!meta) return null
      return (
        <span
          key={`${keyPrefix}-${tag}`}
          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full border ${meta.className}`}
        >
          <span>{meta.icon}</span>
          {meta.label && <span>{meta.label}</span>}
        </span>
      )
    })
    const codeChips = [
      ...getCodeBadges(allergens, allergenLegend, t, false),
      ...getCodeBadges(additives, additiveLegend, t, true),
    ]
    const combined = [...tagChips.filter(Boolean), ...codeChips]
    if (combined.length === 0) return null
    return (
      <div className={`flex flex-wrap gap-2 items-center ${align === 'end' ? 'justify-end' : ''}`}>
        {combined}
      </div>
    )
  }

  return (
    <article className='group bg-white border border-[#d7ead6] rounded-3xl shadow-[0_15px_40px_rgba(37,78,50,0.08)] hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(37,78,50,0.12)] transition-all duration-300 flex flex-col overflow-hidden'>
      <div className='flex flex-row gap-4 p-4 md:gap-6 md:p-5 border-b border-[#e2f2e2] items-start'>
        {hasImage && (
          <figure className='relative w-33 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden'>
            <img
              src={imageSrc}
              alt={translatedName}
              loading='lazy'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/15' />
            {item.code && (
              <span className='absolute top-3 left-3 text-[11px] uppercase tracking-[0.4em] text-white bg-black/45 backdrop-blur-sm px-3 py-1 rounded-full'>
                #{item.code}
              </span>
            )}
          </figure>
        )}
        <div className='flex-1 space-y-3 text-[#123321]'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div>
                <h3 className='text-xl font-semibold text-[#0f2b18]'>
                  {nameParts.main}
                  {nameParts.paren && <span className='inline-block max-w-full break-words whitespace-normal ml-1 text-gray-500'>{nameParts.paren}</span>}
                </h3>
                {translatedDescription && <p className='text-sm text-[#4a6155] mt-1'>{translatedDescription}</p>}
              </div>
            </div>
            <div className='flex flex-wrap items-center justify-between gap-2'>
              <div className='flex-1'>
                {renderInlineInfo({
                  tags: tagList,
                  allergens: item.allergens,
                  additives: item.additives,
                })}
              </div>
              {item.price && <span className='text-lg font-semibold text-[#1f5b38]'>{item.price}</span>}
            </div>
          </div>
        </div>
      </div>

      {(hasVariations || item.extrasList) && (
        <div className='p-5 space-y-4 text-[#123321]'>
          {hasVariations && (
            <div className='space-y-2'>
              {item.variations.map(variation => {
                const variationAllergens = Array.from(
                  new Set([...(item.allergens ?? []), ...(variation.allergens ?? [])]),
                )
                const variationAdditives = Array.from(
                  new Set([...(item.additives ?? []), ...(variation.additives ?? [])]),
                )
                const normalizedLabel = variation.label
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .replace(/ä/g, 'a')
                  .replace(/ö/g, 'o')
                  .replace(/ü/g, 'u')
                  .replace(/ß/g, 'ss')
                  .replace(/&/g, '')
                  .replace(/[^\w]/g, '')
                const variationKey = `menu.variations.${normalizedLabel}`
                const translatedVariationLabel = t(variationKey, { defaultValue: variation.label })
                const variationInlineInfo = renderInlineInfo({
                  tags: variation.tags,
                  allergens: variationAllergens,
                  additives: variationAdditives,
                  keyPrefix: `variation-${variation.code}`,
                })
                const variationCodeNumber = Number.parseInt(variation.code, 10)
                const isSauceOption = variationCodeNumber >= 40 && variationCodeNumber <= 105

                return (
                  <div
                    key={`${variation.code}-${variation.label}`}
                    className='flex flex-col gap-2 text-sm text-[#1f3c29] bg-[#f5fbf3] border border-[#dfeee0] rounded-xl px-3 py-2'
                  >
                    {isSauceOption ? (
                      <div className='flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 w-full'>
                      {/* Phần bên Trái: Bỏ truncate, cho phép xuống dòng thoải mái */}
                      <span className='text-sm font-semibold text-[#123321]'>
                        {variation.code}{' '}
                        <span className='text-xs font-normal text-[#4d6654]'>
                          – {translatedVariationLabel}
                        </span>
                      </span>
                    
                      {/* Phần bên Phải: Thêm ml-auto */}
                      {variationInlineInfo && (
                        <div className='ml-auto flex justify-end shrink-0'>
                          {variationInlineInfo}
                        </div>
                      )}
                    </div>
                    ) : (
                      <>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='text-sm font-semibold text-[#123321]'>
                            {variation.code}{' '}
                            <span className='text-xs font-normal text-[#4d6654]'>– {translatedVariationLabel}</span>
                          </span>
                        </div>
                        {(variationInlineInfo || variation.price) && (
                          <div className='flex flex-wrap items-center justify-between gap-2'>
                            <div className='flex-1'>{variationInlineInfo}</div>
                            {variation.price && <span className='font-semibold text-[#1f5b38]'>{variation.price}</span>}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {item.extrasList && (
            <div className='grid gap-2 sm:grid-cols-2'>
              {item.extrasList.map(extra => {
                const normalizedExtra = extra.label
                  .toLowerCase()
                  .replace(/\s+/g, '')
                  .replace(/ä/g, 'a')
                  .replace(/ö/g, 'o')
                  .replace(/ü/g, 'u')
                  .replace(/ß/g, 'ss')
                  .replace(/[\/]/g, '')
                  .replace(/[^\w]/g, '')
                const extraKey = `menu.items.extras.${normalizedExtra}`
                const translatedExtraLabel = t(extraKey, { defaultValue: extra.label })
                const extraNameParts = splitParenthetical(translatedExtraLabel)
                const descriptionKey = `${extraKey}_description`
                const translatedDescription = extra.description
                  ? t(descriptionKey, { defaultValue: extra.description })
                  : null
                return (
                  <div
                    key={extra.label}
                    className='flex flex-col gap-2 text-sm text-[#1f3c29] bg-[#f5fbf3] border border-[#dfeee0] rounded-xl px-3 py-2'
                  >
                    <span className='flex flex-col'>
                      <span className='font-medium text-[#0f2b18]'>
                        {extraNameParts.main}
                        {extraNameParts.paren && (
                          <span className='whitespace-nowrap ml-1'>{extraNameParts.paren}</span>
                        )}
                      </span>
                      {translatedDescription && <span className='text-xs text-[#4a6155]'>{translatedDescription}</span>}
                    </span>
                    {(extra.price || extra.tags?.length || extra.allergens?.length || extra.additives?.length) && (
                      <div className='flex flex-wrap items-center justify-between gap-2'>
                        <div className='flex-1'>
                          {renderInlineInfo({
                            tags: extra.tags,
                            allergens: extra.allergens,
                            additives: extra.additives,
                            align: 'start',
                            keyPrefix: `extra-${extra.label}`,
                          })}
                        </div>
                        {extra.price && <span className='font-semibold text-[#1f5b38]'>{extra.price}</span>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default MenuItemCard

