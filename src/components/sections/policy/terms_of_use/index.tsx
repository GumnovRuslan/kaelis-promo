import styles from './styles.module.scss'

const TermsOfUse = () => {
  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>Terms of Use</span>
        </h1>
        <h2 className={styles.privacy__published}>Last updated: September, 8, 2025</h2>
        <div className='style_guides'>
          <div>
            <p>Welcome to <strong>Kaelis AI: Tarot & Astrology</strong> (“App”). These Terms of Use (“Terms”) form a legal agreement between you (“user,” “you”) and <strong>Maksim Shamkou</strong> (“Company,” “we,” “our,” or “us”). By downloading, accessing, or using the App, you agree to these Terms. If you do not agree, please do not use the App.</p>
          </div>
          <div>
            <ol>
              <li data-title>
                <h2>Eligibility</h2>
                <ul>
                  <li><span>The App is intended for individuals <strong>18 years or older</strong>.</span></li>
                  <li><span>By using the App, you confirm that you are at least 18 years of age.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>License to Use</h2>
                <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes in accordance with these Terms.</p>
              </li>
              <li data-title>
                <h2>Restrictions</h2>
                <p>You agree not to:</p>
                <ul>
                  <li><span>Copy, modify, or create derivative works of the App.</span></li>
                  <li><span>Reverse-engineer, decompile, or attempt to extract the source code.</span></li>
                  <li><span>Use the App for unlawful or harmful purposes.</span></li>
                  <li><span>Interfere with the App’s functionality, servers, or security.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Subscriptions and Payments</h2>
                <ul>
                  <li><span>The App operates on a <strong>freemium model with auto-renewable subscriptions</strong> (monthly or yearly).</span></li>
                  <li><span>Subscriptions are billed through <strong>Apple App Store</strong> and <strong>Google Play Billing</strong>.</span></li>
                  <li><span>Subscriptions automatically renew unless canceled at least 24 hours before the renewal date.</span></li>
                  <li><span>You can manage or cancel subscriptions in your Apple ID or Google Play account settings.</span></li>
                  <li><span>Refunds are subject to Apple’s and Google’s rules. We do not process payments or refunds directly.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>User Content</h2>
                <ul>
                  <li><span>Users may save questions, diary entries, and readings in the App.</span></li>
                  <li><span>You remain the owner of your content. By using the App, you grant us a limited license to store, process, and display it solely to provide the App’s functionality.</span></li>
                  <li><span>You are responsible for ensuring your content complies with applicable laws and our Content Policy.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Disclaimer of Professional Advice</h2>
                <ul>
                  <li><span>The App provides <strong>lifestyle, entertainment, and self-discovery content</strong>.</span></li>
                  <li><span>It is <strong>not a substitute for medical, psychological, legal, or financial advice</strong>.</span></li>
                  <li><span>You should not rely on the App for decisions related to your health, finances, or legal matters.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Limitation of Liability</h2>
                <p>To the maximum extent permitted by law:</p>
                <ul>
                  <li><span>We are not liable for indirect, incidental, special, or consequential damages arising from your use of the App.</span></li>
                  <li><span>Our total liability shall not exceed the amount you paid (if any) for using the App in the last 12 months.</span></li>
                </ul>
              </li>
              <li data-tile>
                <h2>Termination</h2>
                <p>We may suspend or terminate your access to the App at any time if you violate these Terms or applicable laws. Upon termination, your license to use the App ends immediately.</p>
              </li>
              <li data-title>
                <h2>Governing Law and Jurisdiction</h2>
                <ul>
                  <li><span>These Terms shall be governed by the laws of <strong>Poland</strong>.</span></li>
                  <li><span>Users from the <strong>EU/EEA</strong> are additionally protected by mandatory local consumer laws.</span></li>
                  <li><span>Users from other jurisdictions may have additional rights under local law.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Changes to the Terms</h2>
                <p>We may update these Terms from time to time. If material changes are made, we will notify you via the App or email. Continued use of the App after changes means you accept the updated Terms.</p>
              </li>
              <li data-title>
                <h2>Contact Us</h2>
                <p>If you have questions about these Terms, please contact us:</p>
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

export default TermsOfUse