const BaseScrapper = require('../base/BaseScrapper').BaseScrapper;

class RelaxPhotographerScrapper extends BaseScrapper {
  constructor(props) {
    super(props);

    this._scrape = this._scrape.bind(this);
  }

  scrape() {
    return this.retry(this._scrape);
  }

  async _scrape() {
    const scrapedProfile = await this.page.evaluate(() => {
      const getName = (document) => {
        const titleSpan = document.querySelector('div.PersonalTitle__content .PersonalTitle__text span');

        if (titleSpan) {
          return titleSpan.textContent;
        }

        return '';
      };

      const getAvatarUrl = (document) => {
        return '';
      };

      const getContacts = (document) => {
        const vkContactInfo = getVkContactInfo(document);
        const instagramContactInfo = getInstagramContactInfo(document);
        const viberContactInfo = getViberContactInfo(document);
        const phoneContactInfo = getPhoneContactInfo(document);

        return [
          vkContactInfo,
          instagramContactInfo,
          viberContactInfo,
          phoneContactInfo,
        ].filter(item => item);
      };

      const getVkContactInfo = (document) => {
        const button = document.querySelector('.AdditionalContacts__button.Button.AdditionalContacts__button--vk.AdditionalContacts__button--onlyIcon');

        if (!button) {
          return null;
        }

        const queryParams = new URLSearchParams(button.href);
        const value = queryParams.get('url') || '';

        return {
          type: 'vk',
          value,
        };
      };

      const getInstagramContactInfo = (document) => {
        const button = document.querySelector('.AdditionalContacts__button.Button.AdditionalContacts__button--instagram.AdditionalContacts__button--onlyIcon');

        if (!button) {
          return null;
        }

        const queryParams = new URLSearchParams(button.href);
        const value = queryParams.get('url') || '';

        return {
          type: 'instagram',
          value,
        };
      };

      const getViberContactInfo = (document) => {
        const button = document.querySelector(
          '.AdditionalContacts__button.Button.AdditionalContacts__button--viber');

        if (!button) {
          return null;
        }

        const queryParams = new URLSearchParams(button.href);
        const value = queryParams.get('url') || '';

        return {
          type: 'instagram',
          value,
        };
      };

      const getPhoneContactInfo = (document) => {
        const button = document.querySelector('.Button.PersonalHeaderButton.PersonalHeaderButton--phone a');

        if (!button) {
          return null;
        }

        const rawText = button.href;
        const value = rawText.slice(4, rawText.length);

        return {
          type: 'phone',
          value,
        };
      };

      const getLocation = (document) => {
        const span = document.querySelector('.Button.PersonalContacts__address.PersonalContacts__item.Button--outline span');

        if (span) {
          return {
            name: span.textContent,
          };
        }

        return {
          name: '',
        };
      };

      const getDescription = (document) => {
        const div = document.querySelector('.PersonalAbout__contentInner');

        if (div) {
          return div.innerHTML;
        }

        return '';
      };

      const getSkills = (document) => {
        const containers = [...document.querySelectorAll('.Price.Features__price.Price--columns50')];

        const photoCategoriesSection = containers.find(container => {
          if (!container) {
            return false;
          }

          const sectionName = container.querySelector('.Price__left').textContent;

          return sectionName === 'Виды съемки';
        });

        const skillsSection = containers.find(container => {
          if (!container) {
            return false;
          }

          const sectionName = container.querySelector('.Price__left').textContent;

          return sectionName === 'Возможности';
        });

        let photoCategories = [];
        let skills = [];

        if (photoCategoriesSection) {
          const children = [...photoCategoriesSection.querySelector('.Price__right span').children];

          photoCategories = children.map(item => ({ name: item.textContent }))
        }

        if (skillsSection) {
          const children = [...skillsSection.querySelector('.Price__right span').children];

          skills = children.map(item => ({ name: item.textContent }));
        }

        return [...photoCategories, ...skills];
      };

      return {
        name: getName(document),
        rate: 0,
        avatarUrl: getAvatarUrl(document),
        contacts: getContacts(document),
        location: getLocation(document),
        description: getDescription(document),
        category: {
          name: 'Фотограф',
        },
        skills: getSkills(document),
      };
    });

    await this.page.close();

    return {
      ...scrapedProfile,
      sourceId: this.url,
    };
  }
}

module.exports.RelaxPhotographerScrapper = RelaxPhotographerScrapper;
