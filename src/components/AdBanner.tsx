import { useEffect, useRef } from 'react'

interface AdBannerProps {
  adSlot: string
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdBanner({ adSlot, adFormat = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    if (adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [])

  return (
    <div className={`ads-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: '90px',
        }}
        data-ad-client="ca-pub-3750443322928279"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export function AdHorizontal() {
  return (
    <AdBanner
      adSlot="1526034035"
      adFormat="horizontal"
      className="my-4"
    />
  )
}

export function AdRectangle() {
  return (
    <AdBanner
      adSlot="8100358527"
      adFormat="rectangle"
      className="my-4"
    />
  )
}

export function AdResponsive() {
  return (
    <AdBanner
      adSlot="2720885947"
      adFormat="auto"
      className="my-4"
    />
  )
}
