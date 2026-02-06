import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <section className="home-hero">
      <div className="home-hero-inner">
        <h1 className="home-title">{t('home_title')}</h1>
        <p className="home-subtitle">{t('home_subtitle')}</p>
        <div className="home-ctas">
          <Link to="/varietals" className="btn btn-primary home-cta">
            {t('home_ctaVarietals')}
          </Link>
          <Link to="/recommend" className="btn btn-secondary home-cta">
            {t('home_ctaRecommend')}
          </Link>
          <Link to="/map" className="btn btn-secondary home-cta">
            {t('home_ctaMap')}
          </Link>
        </div>
      </div>
      <div className="home-hero-bg" aria-hidden="true" />
    </section>
  )
}
