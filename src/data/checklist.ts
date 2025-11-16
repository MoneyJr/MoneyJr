export type ChecklistTask = {
  id: string;
  titleKey: string;
};

export type ChecklistSection = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tasks: ChecklistTask[];
};

export const checklist: ChecklistSection[] = [
  {
    id: 'registration',
    titleKey: 'checklist.sections.registration.title',
    descriptionKey: 'checklist.sections.registration.description',
    tasks: [
      { id: 'register-city', titleKey: 'checklist.sections.registration.tasks.registerCity' },
      { id: 'health-insurance', titleKey: 'checklist.sections.registration.tasks.healthInsurance' },
      { id: 'bank-account', titleKey: 'checklist.sections.registration.tasks.bankAccount' },
    ],
  },
  {
    id: 'education',
    titleKey: 'checklist.sections.education.title',
    descriptionKey: 'checklist.sections.education.description',
    tasks: [
      { id: 'language-course', titleKey: 'checklist.sections.education.tasks.languageCourse' },
      { id: 'integration-course', titleKey: 'checklist.sections.education.tasks.integrationCourse' },
      { id: 'school-enrollment', titleKey: 'checklist.sections.education.tasks.schoolEnrollment' },
    ],
  },
  {
    id: 'daily-life',
    titleKey: 'checklist.sections.dailyLife.title',
    descriptionKey: 'checklist.sections.dailyLife.description',
    tasks: [
      { id: 'public-transport', titleKey: 'checklist.sections.dailyLife.tasks.publicTransport' },
      { id: 'sports', titleKey: 'checklist.sections.dailyLife.tasks.sports' },
      { id: 'community-centers', titleKey: 'checklist.sections.dailyLife.tasks.communityCenters' },
    ],
  },
];
