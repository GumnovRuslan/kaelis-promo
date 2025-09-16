import styles from './styles.module.scss'

const SubscriptionPolicy = () => {
  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>Refund & Subscription Policy</span>
        </h1>
        <h2 className={styles.privacy__published}>Last updated: September, 8, 2025</h2>
        <div className='style_guides'>
          <div>
            <p>This Refund & Subscription Policy explains how subscriptions, renewals, cancellations, and refunds work in <strong>Kaelis AI: Tarot & Astrology</strong> (“App”).</p>
          </div>
          <div>
            <ol>
              <li data-title>
                <h2>Subscriptions</h2>
                <ul>
                  <li><span>The App uses a <strong>freemium model</strong>: free basic features + optional paid subscriptions (monthly or yearly).</span></li>
                  <li><span>Paid subscriptions unlock premium features, including extended tarot and astrology readings, multiple interpretation styles, and personalized insights.</span></li>
                  <li><span>All subscriptions are managed through the <strong>Apple App Store or Google Play Store</strong>.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Auto-Renewal</h2>
                <ul>
                  <li><span>Subscriptions are <strong>auto-renewable</strong>.</span></li>
                  <li><span>Your subscription will automatically renew at the end of each billing cycle unless you cancel at least <strong>24 hours before the renewal date</strong>.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Free Trials</h2>
                <ul>
                  <li><span>Some plans may include a <strong>free trial period</strong>.</span></li>
                  <li><span>If you do not cancel before the trial ends, you will be automatically charged for the selected subscription.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Managing Subscriptions</h2>
                <p>You can manage or cancel your subscription at any time:</p>
                <ul>
                  <li><strong>iOS (Apple App Store)</strong><span>: Open Settings → Apple ID → Subscriptions.</span></li>
                  <li><strong>Android (Google Play)</strong><span>: Open Google Play Store → Profile → Payments & subscriptions.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Refunds</h2>
                <ul>
                  <li><span>All payments and refunds are handled directly by Apple <strong>App Store</strong> and <strong>Google Play Billing</strong>.</span></li>
                  <li><span>We cannot issue refunds or manage billing disputes ourselves.</span></li>
                  <li>
                    <span>To request a refund, please use:</span>
                    <ul data-margin-left>
                      <li><span>Apple: </span><a target='_blank' href="https://support.apple.com/en-us/HT204084">https://support.apple.com/en-us/HT204084</a></li>
                      <li><span>Google: </span><a target='_blank' href="https://support.google.com/googleplay/answer/2479637">https://support.google.com/googleplay/answer/2479637</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li data-title>
                <h2>Failed Payments</h2>
                <ul>
                  <li><span>If a payment fails, your subscription may be suspended until the payment is successfully processed.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Changes to Pricing</h2>
                <ul>
                  <li><span>We may adjust subscription prices from time to time.</span></li>
                  <li><span>If prices change, you will be notified by Apple or Google before the next billing cycle.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Contact Us</h2>
                <p>If you have any questions about this Policy, please contact:</p>
                <p><strong>Maksim Shamkou</strong></p>
                <p><strong>info.kaelis@gmail.com</strong></p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscriptionPolicy