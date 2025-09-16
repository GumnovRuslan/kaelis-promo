import styles from './styles.module.scss';

const PrivacyPolicy = () => {

  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>Privacy Policy</span>
        </h1>
        <h2 className={styles.privacy__published}>Last updated: September, 8, 2025</h2>
        <div className='style_guides'>
          <div>
            <p>This Privacy Policy explains how <strong>Maksim Shamkou</strong> (“Company,” “we,” “our,” or “us”) collects, uses, stores, and protects your personal information when you use our mobile application <strong>Kaelis AI: Tarot & Astrology</strong> (“App”).</p>
          </div>
          <div>
            <p>
              We are committed to protecting your privacy in compliance with the <strong>General Data Protection Regulation (GDPR)</strong>, the <strong>California Consumer Privacy Act (CCPA/CPRA)</strong>, the <strong>Children’s Online Privacy Protection Act (COPPA)</strong>, and other applicable international laws.
            </p>
          </div>
          <div>
            <ol>
              <li data-title>
                <h2>Information We Collect</h2>
                <p>We may collect the following categories of information when you use the App:</p>
                <ul>
                  <li><strong>Account and Login Data</strong>: email, login via Apple ID, Google, or social networks.</li>
                  <li><strong>Profile Information</strong>: name, gender, birth date, birth time, birth timezone, birth place (including latitude and longitude).</li>
                  <li><strong>Usage Data</strong>: tarot questions, readings, diary entries, language and style preferences, in-app behavior.</li>
                  <li><strong>Device Data</strong>: device model, OS version, push notification token, app analytics identifiers.</li>
                  <li><strong>Payment Data</strong>: processed by Apple App Store and Google Play Billing. We do not store payment details.</li>
                </ul>
              </li>
              <li data-title>
                <h2>How We Use Your Information</h2>
                <p>We process data to:</p>
                <ul>
                  <li>Provide and personalize readings and astrological insights.</li>
                  <li>Enable login, subscriptions, and personal diary features.</li>
                  <li>Send push notifications (if enabled).</li>
                  <li>Improve the App through analytics.</li>
                  <li>Comply with legal and regulatory requirements.</li>
                </ul>
              </li>
              <li data-title>
                <h2>Legal Basis for Processing (GDPR)</h2>
                <p>We process personal data under the following lawful bases:</p>
                <ul>
                  <li><strong>Consent</strong>: for birth data, gender, push notifications.</li>
                  <li><strong>Contractual necessity</strong>: to provide services and manage subscriptions.</li>
                  <li><strong>Legitimate interests</strong>: analytics, service improvement, fraud prevention.</li>
                  <li><strong>Legal obligation</strong>: compliance with applicable law.</li>
                </ul>
              </li>
              <li data-title>
                <h2>Sharing of Data</h2>
                <p>We do not sell your personal information. Data may be shared only with:</p>
                <ul>
                  <li>Service providers (hosting, analytics, push notifications).</li>
                  <li>Payment processors (Apple, Google).</li>
                  <li>Legal authorities (if required by law).</li>
                </ul>
              </li>
              <li data-title>
                <h2>Data Retention</h2>
                <p>We keep your data while your account is active.</p>
                <p>Upon deletion request, personal data will be erased within <strong>30 days.</strong></p>
                <p>Anonymized usage data may be stored longer for analytics.</p>
              </li>
              <li data-title>
                <h2>International Data Transfers</h2>
                <p>Your data may be processed and stored in the <strong>European Union</strong> and other countries.</p>
                <p>When transferring outside the EEA, we apply safeguards such as:</p>
                <ul>
                  <li><strong>Standard Contractual Clauses (SCCs).</strong></li>
                  <li><strong>EU–U.S. Data Privacy Framework (if applicable).</strong></li>
                </ul>
              </li>
              <li data-title>
                <h2>Your Rights</h2>
                <p>You may exercise the following rights depending on your location:</p>
                <ol data-style-a>
                  <li>
                    <strong>EU / EEA (GDPR)</strong>
                    <ul>
                      <li><span>Right of access, correction, deletion (“right to be forgotten”).</span></li>
                      <li><span>Right to restrict or object to processing.</span></li>
                      <li><span>Right to data portability.</span></li>
                      <li><span>Right to lodge a complaint with your local Data Protection Authority.</span></li>
                    </ul>
                  </li>
                  <li>
                    <strong>California, USA (CCPA/CPRA)</strong>
                    <ul>
                      <li><span>Right to know what personal information is collected and how it is used.</span></li>
                      <li><span>Right to request deletion of personal information.</span></li>
                      <li><span>Right to opt-out of the sale of personal information (we do not sell data).</span></li>
                      <li><span>Right to non-discrimination for exercising privacy rights.</span></li>
                    </ul>
                  </li>
                  <li>
                    <strong>United Kingdom (UK GDPR)</strong>
                    <p>Same rights as GDPR, under the UK Data Protection Act 2018.</p>
                  </li>
                  <li>
                    <strong>Other Regions (Ukraine, CIS, Canada, Australia, etc.)</strong>
                    <p>You may contact us to request access, correction, or deletion of your data. We will review and handle requests in accordance with applicable local laws.</p>
                  </li>
                </ol>
              </li>
              <li data-title>
                <h2>Children’s Privacy</h2>
                <ul>
                  <li><span>This App is <strong>not directed to children under 18.</strong></span></li>
                  <li><span>We do not knowingly collect information from minors.</span></li>
                  <li><span>If you believe a child has provided personal data, please contact us at <strong>info.kaelis@gmail.com</strong> and we will delete it promptly.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Security of Your Data</h2>
                <p>We apply technical and organizational safeguards, including:</p>
                <ul>
                  <li>Data encryption (SSL/TLS).</li>
                  <li>Secure hosting with access restrictions.</li>
                  <li>Regular security audits.</li>
                </ul>
                <p>No system is completely secure, and we cannot guarantee absolute security.</p>
              </li>
              <li data-title>
                <h2>Subscriptions and Payments</h2>
                <ul>
                  <li>Subscriptions are managed by Apple <strong>App Store</strong> and <strong>Google Play Billing</strong>.</li>
                  <li>We do not process or store credit card data.</li>
                  <li>Refunds and cancellations must be handled through Apple or Google according to their policies.</li>
                </ul>
              </li>
              <li data-title>
                <h2>Changes to this Policy</h2>
                <p>We may update this Policy occasionally. If material changes are made, we will notify users via the App or email.</p>
              </li>
              <li data-title>
                <h2>Governing Law and Jurisdiction</h2>
                <p>This Policy is governed by the laws of <strong>Poland</strong>.</p>
                <p>For EU/EEA users, GDPR rights apply.</p>
                <p>For other jurisdictions, local consumer protection and privacy laws may apply additionally.</p>
              </li>
              <li data-title>
                <h2>Contact Us</h2>
                <p>If you have any questions, requests, or complaints about this Policy, please contact us:</p>
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

export default PrivacyPolicy;