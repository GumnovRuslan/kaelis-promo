import styles from './styles.module.scss'

const ContentPolicy = () => {
  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>Content Policy</span>
        </h1>
        <h2 className={styles.privacy__published}>Last updated: September, 8, 2025</h2>
        <div className='style_guides'>
          <div>
            <p>The <strong>Kaelis AI: Tarot & Astrology</strong> app (“App”) is designed to provide users with a safe and respectful environment for self-discovery and entertainment. By using the App, you agree to follow the rules below regarding user-generated content.</p>
          </div>
          <div>
            <ol>
              <li data-title>
                <h2>User Content</h2>
                <ul>
                  <li><span>Users may save tarot questions, readings, diary entries, and other personal notes in the App.</span></li>
                  <li><span>You remain the owner of your content. However, you grant us a limited license to store, process, and display it solely for providing the App’s features.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Prohibited Content</h2>
                <p>You may not create, store, or share content that:</p>
                <ul>
                  <li><span>Contains hate speech, harassment, or abusive language.</span></li>
                  <li><span>Promotes violence, self-harm, or illegal activity.</span></li>
                  <li><span>Includes sexually explicit, pornographic, or obscene material.</span></li>
                  <li><span>Infringes on copyrights, trademarks, or other intellectual property rights.</span></li>
                  <li><span>Shares personal data of third parties without their consent.</span></li>
                  <li><span>Attempts to exploit, deceive, or harm others.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Monitoring and Enforcement</h2>
                <ul>
                  <li><span>We reserve the right to review and remove content that violates this Policy or applicable law.</span></li>
                  <li><span>In case of serious violations, we may <strong>suspend or terminate your account</strong> without prior notice.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Reporting Content</h2>
                <p>If you encounter content that violates this Policy, you may report it by contacting us at:</p>
                <p><strong>info.kaelis@gmail.com.</strong></p>
              </li>
              <li data-title>
                <h2>Limitation of Responsibility</h2>
                <ul>
                  <li><span>We are not responsible for user content saved in the App.</span></li>
                  <li><span>You are solely responsible for ensuring that your entries and questions comply with this Policy and with applicable laws in your country.</span></li>
                </ul>
              </li>
              <li data-title>
                <h2>Updates to this Policy</h2>
                <p>We may update this Content Policy from time to time. If material changes are made, we will notify users via the App or by email.</p>
              </li>
              <li data-title>
                <h2>Contact Us</h2>
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

export default ContentPolicy