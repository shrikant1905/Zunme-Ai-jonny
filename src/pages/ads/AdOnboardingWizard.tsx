import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Megaphone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  UploadCloud,
  Target,
  Users,
  DollarSign,
  Rocket,
  Check,
  X,
  Sparkles,
  Layers,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './AdOnboardingWizard.css';

export const AdOnboardingWizard: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 7;

  // Step 1: Sign Up / Zunme Pro
  const [accountType, setAccountType] = useState<'pro' | 'enterprise'>('pro');
  const [accountEmail, setAccountEmail] = useState('advertiser@brand.com');
  const [proVerified, setProVerified] = useState(true);

  // Step 2: Business Information
  const [businessName, setBusinessName] = useState('Aura Modern Tech Inc.');
  const [businessCategory, setBusinessCategory] = useState('Software / SaaS');
  const [websiteUrl, setWebsiteUrl] = useState('https://auramodern.io');
  const [country, setCountry] = useState('United States');
  const [taxId, setTaxId] = useState('US-94820148');

  // Step 3: Product Data Upload / Feed
  const [catalogSource, setCatalogSource] = useState<'manual' | 'feed' | 'warehouse'>('manual');
  const [productFeedUrl, setProductFeedUrl] = useState('https://auramodern.io/catalog/products.xml');
  const [sampleProductName, setSampleProductName] = useState('AI Growth Engine Pro');

  // Step 4: Advertising Objective
  const [objective, setObjective] = useState<string>('CONVERSIONS');

  // Step 5: Target Audience (Demographics, Location, Device)
  const [targetAgeMin, setTargetAgeMin] = useState(24);
  const [targetAgeMax, setTargetAgeMax] = useState(55);
  const [targetGender, setTargetGender] = useState<'ALL' | 'MALE' | 'FEMALE'>('ALL');
  const [targetGeo, setTargetGeo] = useState('United States, Canada, United Kingdom');
  const [targetDevices, setTargetDevices] = useState<string[]>(['Desktop', 'Mobile']);
  const [targetInterests, setTargetInterests] = useState('AI Marketing, B2B Growth, SaaS Software');

  // Step 6: Budget
  const [dailyBudget, setDailyBudget] = useState<number>(50.0);
  const [biddingStrategy, setBiddingStrategy] = useState<'AUTO' | 'MANUAL_CPC'>('AUTO');
  const [maxCpcBid, setMaxCpcBid] = useState<number>(0.65);

  // Step 7: Ad Creation & Final Review
  const [adHeadline, setAdHeadline] = useState('Scale B2B Growth with Autonomous AI');
  const [adDescription, setAdDescription] = useState('Accelerate sales pipeline and generate verified content directly inside Zunme AI.');
  const [adDestinationUrl, setAdDestinationUrl] = useState('https://auramodern.io/demo');
  const [adFormat, setAdFormat] = useState('SPONSORED_SEARCH');

  // Completion State
  const [isCompleted, setIsCompleted] = useState(false);

  const stepsList = [
    { number: 1, title: 'Pro Setup', icon: <ShieldCheck size={14} /> },
    { number: 2, title: 'Business Info', icon: <Building2 size={14} /> },
    { number: 3, title: 'Product Feed', icon: <UploadCloud size={14} /> },
    { number: 4, title: 'Objective', icon: <Target size={14} /> },
    { number: 5, title: 'Audience', icon: <Users size={14} /> },
    { number: 6, title: 'Budget', icon: <DollarSign size={14} /> },
    { number: 7, title: 'Ad Creative', icon: <Rocket size={14} /> }
  ];

  const handleNext = () => {
    // Basic validation per step
    if (currentStep === 2 && !businessName.trim()) {
      showToast('Please enter your business name.', 'error');
      return;
    }
    if (currentStep === 7 && (!adHeadline.trim() || !adDescription.trim())) {
      showToast('Ad headline and description are required.', 'error');
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Final Submit
      setIsCompleted(true);
      showToast('Advertising Account & Onboarding successfully completed (Demo Setup)!', 'success');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleDevice = (dev: string) => {
    setTargetDevices(prev => 
      prev.includes(dev) ? prev.filter(d => d !== dev) : [...prev, dev]
    );
  };

  return (
    <div className="ad-wizard-container">
      {/* Header */}
      <div className="ad-wizard-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-primary">Client Specification Checklist</span>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Step {currentStep} of {totalSteps}</span>
          </div>
          <h1 className="ad-wizard-title" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '4px' }}>
            7-Step Advertising Account Onboarding
          </h1>
        </div>

        <NavLink to="/ads/overview" className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>
          <span>Cancel &amp; Return to Ads Dashboard</span>
        </NavLink>
      </div>

      {/* 7-Step Stepper Progress Bar */}
      <div className="ad-wizard-stepper">
        {stepsList.map((s, idx) => (
          <React.Fragment key={s.number}>
            <div
              className={`ad-wizard-step-node ${currentStep === s.number ? 'active' : ''} ${currentStep > s.number ? 'completed' : ''}`}
              onClick={() => s.number < currentStep && setCurrentStep(s.number)}
            >
              <div className="ad-wizard-step-circle">
                {currentStep > s.number ? <Check size={14} /> : s.number}
              </div>
              <span className="ad-wizard-step-label">{s.title}</span>
            </div>
            {idx < stepsList.length - 1 && (
              <div className={`ad-wizard-step-divider ${currentStep > s.number ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Success Modal / Screen */}
      {isCompleted ? (
        <div className="ad-wizard-card" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Onboarding Completed &amp; Campaign Scheduled!
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Your business profile for <strong>{businessName}</strong>, targeting parameters, and ad creative have been staged in the Zunme Advertising engine (Demo Prototype Mode).
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <NavLink to="/ads/campaigns" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              <Megaphone size={15} />
              <span>View Active Campaigns</span>
            </NavLink>
            <NavLink to="/ads/formats" className="btn btn-outline" style={{ textDecoration: 'none' }}>
              <span>Build More Ad Formats</span>
            </NavLink>
          </div>
        </div>
      ) : (
        /* Wizard Card */
        <div className="ad-wizard-card">
          {/* STEP 1: SIGN UP / ZUNME PRO ACCOUNT SETUP */}
          {currentStep === 1 && (
            <>
              <div className="ad-wizard-card-header">
                <h2 className="ad-wizard-step-title">Step 1: Sign Up / Zunme Pro Account Setup</h2>
                <p className="ad-wizard-step-desc">
                  Advertising on the Zunme Multi-Platform Advertising (MPA) network requires an active verified advertiser account with Pro status.
                </p>
              </div>

              <div className="ad-wizard-pro-tier-box" style={{ padding: '16px', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--color-primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)', display: 'block' }}>
                      Zunme Pro Advertising Tier
                    </strong>
                    <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                      ✓ Verified Member Status Active
                    </span>
                  </div>
                </div>
                <span className="badge badge-success">Verified</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Advertiser Contact Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                />
              </div>
            </>
          )}

          {/* STEP 2: BUSINESS INFORMATION */}
          {currentStep === 2 && (
            <>
              <div className="ad-wizard-card-header">
                <h2 className="ad-wizard-step-title">Step 2: Business Information</h2>
                <p className="ad-wizard-step-desc">
                  Provide your registered business details for billing verification, currency settings, and compliance.
                </p>
              </div>

              <div className="ad-wizard-review-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Business Legal Name *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Industry / Vertical
                  </label>
                  <select
                    className="input-field"
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                  >
                    <option value="Software / SaaS">Software / SaaS</option>
                    <option value="E-Commerce & Digital Goods">E-Commerce &amp; Digital Goods</option>
                    <option value="Marketing & Creative Agency">Marketing &amp; Creative Agency</option>
                    <option value="Education & Training">Education &amp; Training</option>
                    <option value="Finance & Professional Services">Finance &amp; Professional Services</option>
                  </select>
                </div>
              </div>

              <div className="ad-wizard-review-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Website Destination URL
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Tax ID / Business Registration
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 3: PRODUCT DATA UPLOAD OR FEED */}
          {currentStep === 3 && (
            <>
              <div className="ad-wizard-card-header">
                <h2 className="ad-wizard-step-title">Step 3: Product Data Upload or Feed</h2>
                <p className="ad-wizard-step-desc">
                  Connect your product catalog for automated dynamic product ads and shopping placements.
                </p>
              </div>

              <div className="ad-wizard-catalog-source-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div
                  className={`zbox-platform-card ${catalogSource === 'manual' ? 'selected' : ''}`}
                  onClick={() => setCatalogSource('manual')}
                >
                  <Layers size={18} />
                  <span>Manual Asset Entry</span>
                </div>
                <div
                  className={`zbox-platform-card ${catalogSource === 'feed' ? 'selected' : ''}`}
                  onClick={() => setCatalogSource('feed')}
                >
                  <UploadCloud size={18} />
                  <span>Product XML/CSV Feed</span>
                </div>
                <div
                  className={`zbox-platform-card ${catalogSource === 'warehouse' ? 'selected' : ''}`}
                  onClick={() => setCatalogSource('warehouse')}
                >
                  <Sparkles size={18} />
                  <span>AI Warehouse Catalog</span>
                </div>
              </div>

              {catalogSource === 'feed' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Catalog Feed URL (Google Merchant / Shopify XML)
                  </label>
                  <input
                    type="url"
                    className="input-field"
                    value={productFeedUrl}
                    onChange={(e) => setProductFeedUrl(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Primary Showcase Product / Asset Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={sampleProductName}
                    onChange={(e) => setSampleProductName(e.target.value)}
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 4: ADVERTISING OBJECTIVE */}
          {currentStep === 4 && (
            <>
              <div className="ad-wizard-card-header">
                <h2 className="ad-wizard-step-title">Step 4: Advertising Objective</h2>
                <p className="ad-wizard-step-desc">
                  Choose the primary conversion goal for the Zunme campaign optimization engine.
                </p>
              </div>

              <div className="ad-wizard-objective-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {[
                  { id: 'CONVERSIONS', label: 'Conversions & Sales', desc: 'Drive high-intent purchases and signups' },
                  { id: 'LEADS', label: 'Lead Generation', desc: 'Capture qualified email & phone inquiries' },
                  { id: 'TRAFFIC', label: 'Website Traffic', desc: 'Maximize high-CTR clicks to your landing page' },
                  { id: 'BRAND_AWARENESS', label: 'Brand Reach', desc: 'Expand visibility across search & studio feeds' }
                ].map(obj => (
                  <div
                    key={obj.id}
                    className={`zbox-platform-card ${objective === obj.id ? 'selected' : ''}`}
                    onClick={() => setObjective(obj.id)}
                    style={{ textAlign: 'left', alignItems: 'flex-start', padding: '16px' }}
                  >
                    <Target size={18} color={objective === obj.id ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />
                    <strong style={{ fontSize: '14px', color: 'var(--color-text-primary)' }}>{obj.label}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{obj.desc}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 5: TARGET AUDIENCE */}
          {currentStep === 5 && (
            <>
              <div className="ad-wizard-card-header">
                <h2 className="ad-wizard-step-title">Step 5: Target Audience</h2>
                <p className="ad-wizard-step-desc">
                  Define demographic age brackets, geographic territories, and device environments.
                </p>
              </div>

              <div className="ad-wizard-review-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Age Range ({targetAgeMin} - {targetAgeMax} years)
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="number"
                      className="input-field"
                      min={18}
                      max={65}
                      value={targetAgeMin}
                      onChange={(e) => setTargetAgeMin(Number(e.target.value))}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      className="input-field"
                      min={18}
                      max={65}
                      value={targetAgeMax}
                      onChange={(e) => setTargetAgeMax(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Gender Targeting
                  </label>
                  <select
                    className="input-field"
                    value={targetGender}
                    onChange={(e) => setTargetGender(e.target.value as any)}
                  >
                    <option value="ALL">All Genders</option>
                    <option value="MALE">Male Only</option>
                    <option value="FEMALE">Female Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Target Geographies / Countries
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={targetGeo}
                  onChange={(e) => setTargetGeo(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Target Devices
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['Desktop', 'Mobile', 'Tablet'].map(dev => (
                    <label key={dev} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={targetDevices.includes(dev)}
                        onChange={() => toggleDevice(dev)}
                      />
                      <span>{dev}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STEP 6: BUDGET */}
          {currentStep === 6 && (
            <>
              <div className="ad-wizard-card-header">
                <h2 className="ad-wizard-step-title">Step 6: Budget &amp; Bidding</h2>
                <p className="ad-wizard-step-desc">
                  Set daily spend limits and choose between automated AI auction bidding or manual CPC.
                </p>
              </div>

              <div className="ad-wizard-review-grid">
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Daily Budget Limit ($ USD)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={1000}
                    className="input-field"
                    value={dailyBudget}
                    onChange={(e) => setDailyBudget(Number(e.target.value))}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                    Est. Monthly Spend: ${(dailyBudget * 30.4).toFixed(2)}
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Bidding Strategy
                  </label>
                  <select
                    className="input-field"
                    value={biddingStrategy}
                    onChange={(e) => setBiddingStrategy(e.target.value as any)}
                  >
                    <option value="AUTO">Automated Maximize Clicks</option>
                    <option value="MANUAL_CPC">Manual CPC Keyword Bidding</option>
                  </select>
                </div>
              </div>

              {biddingStrategy === 'MANUAL_CPC' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Maximum CPC Ceiling ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    className="input-field"
                    value={maxCpcBid}
                    onChange={(e) => setMaxCpcBid(Number(e.target.value))}
                  />
                </div>
              )}
            </>
          )}

          {/* STEP 7: AD CREATION & REVIEW */}
          {currentStep === 7 && (
            <>
              <div className="ad-wizard-card-header">
                <h2 className="ad-wizard-step-title">Step 7: Ad Creation &amp; Comprehensive Review</h2>
                <p className="ad-wizard-step-desc">
                  Finalize your creative copy and review your 7-step setup summary prior to submission.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Ad Headline *
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={adHeadline}
                  onChange={(e) => setAdHeadline(e.target.value)}
                  maxLength={50}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Ad Description *
                </label>
                <textarea
                  className="input-field"
                  style={{ minHeight: '65px' }}
                  value={adDescription}
                  onChange={(e) => setAdDescription(e.target.value)}
                  maxLength={120}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Destination Click-Through URL *
                </label>
                <input
                  type="url"
                  className="input-field"
                  value={adDestinationUrl}
                  onChange={(e) => setAdDestinationUrl(e.target.value)}
                  required
                />
              </div>

              {/* 7-Step Summary Table */}
              <div style={{ marginTop: '14px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                  Onboarding Configuration Review
                </h4>
                <div className="ad-wizard-review-grid">
                  <div className="ad-wizard-review-box">
                    <div className="ad-wizard-review-label">1. Account</div>
                    <div className="ad-wizard-review-val">Zunme Pro ({accountEmail})</div>
                  </div>
                  <div className="ad-wizard-review-box">
                    <div className="ad-wizard-review-label">2. Business</div>
                    <div className="ad-wizard-review-val">{businessName} ({businessCategory})</div>
                  </div>
                  <div className="ad-wizard-review-box">
                    <div className="ad-wizard-review-label">3. Product Feed</div>
                    <div className="ad-wizard-review-val">{catalogSource.toUpperCase()} Catalog</div>
                  </div>
                  <div className="ad-wizard-review-box">
                    <div className="ad-wizard-review-label">4. Objective</div>
                    <div className="ad-wizard-review-val">{objective}</div>
                  </div>
                  <div className="ad-wizard-review-box">
                    <div className="ad-wizard-review-label">5. Audience</div>
                    <div className="ad-wizard-review-val">{targetAgeMin}-{targetAgeMax} yrs • {targetGender} • {targetDevices.join(', ')}</div>
                  </div>
                  <div className="ad-wizard-review-box">
                    <div className="ad-wizard-review-label">6. Budget</div>
                    <div className="ad-wizard-review-val">${dailyBudget}/day ({biddingStrategy})</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Footer Controls */}
          <div className="ad-wizard-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft size={15} />
              <span>Previous Step</span>
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              <span>{currentStep === totalSteps ? 'Finalize & Launch (Demo)' : 'Proceed to Next Step'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
