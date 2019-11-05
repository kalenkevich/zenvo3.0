const BaseScrapper = require('../base/BaseScrapper').BaseScrapper;

class RelaxPhotographerScrapper extends BaseScrapper {
  async scrape() {
    const data = await this.page.evaluate(() => {
      const getName = (document) => {
        const titleSpan = document.querySelector(
          'div.PersonalTitle__content .PersonalTitle__text span');

        return titleSpan.textContent;
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
        const button = document.querySelector(
          '.AdditionalContacts__button.Button.AdditionalContacts__button--vk.AdditionalContacts__button--onlyIcon');
        const queryParams = new URLSearchParams(button.href);
        const value = queryParams.get('url');

        return {
          type: 'vk',
          value,
        };
      };

      const getInstagramContactInfo = (document) => {
        const button = document.querySelector(
          '.AdditionalContacts__button.Button.AdditionalContacts__button--instagram.AdditionalContacts__button--onlyIcon');
        const queryParams = new URLSearchParams(button.href);
        const value = queryParams.get('url');

        return {
          type: 'instagram',
          value,
        };
      };

      const getViberContactInfo = (document) => {
        const button = document.querySelector(
          '.AdditionalContacts__button.Button.AdditionalContacts__button--viber');
        const queryParams = new URLSearchParams(button.href);
        const value = queryParams.get('url');

        return {
          type: 'instagram',
          value,
        };
      };

      const getPhoneContactInfo = (document) => {
        const button = document.querySelector(
          '.Button.PersonalHeaderButton.PersonalHeaderButton--phone a');
        const rawText = button.href;
        const value = rawText.slice(4, rawText.length);

        return {
          type: 'phone',
          value,
        };
      };

      const getLocation = (document) => {
        const span = document.querySelector(
          '.Button.PersonalContacts__address.PersonalContacts__item.Button--outline span');

        return {
          name: span.textContent,
        };
      };

      const getDescription = (document) => {
        const div = document.querySelector('.PersonalAbout__contentInner');

        return div.innerHTML;
      };

      const getSkills = (document) => {
        const containers = document.querySelectorAll(
          '.Price.PersonalFeatures__price.PersonalFeatures__price--wrapped.Price--columns50');

        const photoCategoriesSection = [...containers].find(container => {
          const sectionName = container.querySelector(
            '.Price__left').textContent;

          return sectionName === 'Виды съемки';
        });

        const skillsSection = [...containers].find(container => {
          const sectionName = container.querySelector('.Price__left').textContent;

          return sectionName === 'Возможности';
        });

        const photoCategories = [...photoCategoriesSection.querySelector('.Price__right span').children]
          .map(item => ({ name: item.textContent }));

        const skills = [...skillsSection.querySelector('.Price__right span').children]
          .map(item => ({ name: item.textContent }));

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
    await this.browser.close();

    return data;
  }
}

module.exports.RelaxPhotographerScrapper = RelaxPhotographerScrapper;
