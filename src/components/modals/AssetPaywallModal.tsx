import React from 'react';
import {
  X,
  Lock,
  Crown,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './ModalsExtended.css';

export interface AssetPaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  assetTitle: string;
  creatorName?: string;
  category?: string;
  licensing?: string;
  mockPrice?: string;
  onUnlockSimulate?: () => void;
}

export const AssetPaywallModal: React.FC<AssetPaywallModalProps> = ({
  isOpen,
  onClose,
  assetTitle,
  creatorName = 'Verified Zunme Creator',
  category = 'Commercial Pro Workflow',
  licensing = 'Commercial Pro',
  mockPrice = '$4.99',
  onUnlockSimulate
}) => {
  const { showToast } = useApp();

  if (!isOpen) return null;

  const handleUnlockDemo = () => {
    showToast(
      `Mock Asset Unlocked: "${assetTitle}" is now accessible in your local library!`,
      'success'
    );
    if (onUnlockSimulate) {
      onUnlockSimulate();
    }
    onClose();
  };

  return (
    <div
      className="paywall-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
    >
      <div className="paywall-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="paywall-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="paywall-modal-content">
          <div className="paywall-icon-ring">
            <Lock size={26} className="paywall-lock-icon" />
          </div>

          <div className="paywall-badge-pill">
            <Crown size={12} />
            <span>Commercial Pro Asset</span>
          </div>

          <h2 id="paywall-title" className="paywall-title">
            Unlock Full Commercial Asset
          </h2>
          <p className="paywall-asset-name">"{assetTitle}"</p>
          <p className="paywall-creator-by">By {creatorName} • {category}</p>

          <div className="paywall-perks-box">
            <div className="paywall-perk-item">
              <CheckCircle2 size={15} className="paywall-check" />
              <span>Full high-fidelity prompt source &amp; executable parameters</span>
            </div>
            <div className="paywall-perk-item">
              <CheckCircle2 size={15} className="paywall-check" />
              <span>Commercial Pro License: Uncapped redistribution &amp; client rights</span>
            </div>
            <div className="paywall-perk-item">
              <CheckCircle2 size={15} className="paywall-check" />
              <span>Lifetime persistent cloud sync in your Personal Library</span>
            </div>
          </div>

          <div className="paywall-options-grid">
            <div className="paywall-card-option">
              <span className="paywall-option-tag">One-Time Asset Pass</span>
              <div className="paywall-price">{mockPrice}</div>
              <p className="paywall-option-desc">Direct unlock for this asset only</p>
              <button
                type="button"
                className="paywall-action-btn paywall-btn-secondary"
                onClick={handleUnlockDemo}
              >
                <span>Mock Single Purchase</span>
              </button>
            </div>

            <div className="paywall-card-option highlight-option">
              <div className="paywall-popular-ribbon">Recommended</div>
              <span className="paywall-option-tag text-violet">Pro Creator Plan</span>
              <div className="paywall-price">$29<span className="per-month">/mo</span></div>
              <p className="paywall-option-desc">Unlimited downloads of all 1,000+ assets</p>
              <NavLink
                to="/app/usage"
                className="paywall-action-btn paywall-btn-primary"
                onClick={onClose}
              >
                <span>Upgrade to Pro</span>
                <ArrowRight size={14} />
              </NavLink>
            </div>
          </div>

          <div className="paywall-footer-note">
            <ShieldAlert size={13} />
            <span>Encrypted access permissions • Simulated frontend demo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetPaywallModal;
