export type TResultSchemesBlock = {
  title: string
  content: {
    type: 'text' | 'list';
    text: string[]
  }[]
}

export type TResultScheme = {
    title: string;
    subtitle: string;
    affirmation: string;
    gif?: {
      src: string;
    };
    blocks: TResultSchemesBlock[];
}

const mage: TResultScheme = {
  title: 'mage.title',
  subtitle: 'mage.subtitle',
  affirmation: 'mage.affirmation',
  gif: {
    src: '/video/archetypes/mage.mp4'
  },
  blocks: [
      {
        title: 'mage.content.who_are_you.title',
        content: [
          {
            type: 'text', 
            text: [
              `mage.content.who_are_you.inner.text_1`,
              `mage.content.who_are_you.inner.text_2`,
              `mage.content.who_are_you.inner.text_3`,
              `mage.content.who_are_you.inner.text_4`,
              `mage.content.who_are_you.inner.text_5`,
              `mage.content.who_are_you.inner.text_6`,
              `mage.content.who_are_you.inner.text_7`,
            ]}
        ]
      },
      {
        title: 'mage.content.strengths.title',
        content: [
          {
            type: 'list',
            text: [
              `mage.content.strengths.inner.item_1`,
              `mage.content.strengths.inner.item_2`,
              `mage.content.strengths.inner.item_3`,
              `mage.content.strengths.inner.item_4`,
            ]
          }
        ]
      },
      {
        title: `mage.content.shadow.title`,
        content: [
          {
            type: 'text',
            text: [`mage.content.shadow.inner.text_1`]
          },
          {
              type: 'list', 
              text: [
                `mage.content.shadow.inner.item_1`,
                `mage.content.shadow.inner.item_2`,
                `mage.content.shadow.inner.item_3`,
                `mage.content.shadow.inner.item_4`,
                `mage.content.shadow.inner.item_5`,
              ]
            }
        ]
      },
      {
        title: `mage.content.where_you_thrive.title`,
        content: [
          {
            type: 'text',
            text: [`mage.content.where_you_thrive.inner.text_1`]
          },
          {
            type: 'list', 
            text: [
              `mage.content.where_you_thrive.inner.item_1`,
              `mage.content.where_you_thrive.inner.item_2`,
              `mage.content.where_you_thrive.inner.item_3`,
              `mage.content.where_you_thrive.inner.item_4`,
              `mage.content.where_you_thrive.inner.item_5`,
            ]
          },
          {
            type: 'text',
            text: [`mage.content.where_you_thrive.inner.text_2`]
          },
        ]
      },
      {
        title: `mage.content.signs_of_imbalance.title`,
        content: [
          {
            type: 'text',
            text: [`mage.content.signs_of_imbalance.inner.text_1`]
          },
          {
            type: 'list', 
            text: [
              `mage.content.signs_of_imbalance.inner.item_1`,
              `mage.content.signs_of_imbalance.inner.item_2`,
              `mage.content.signs_of_imbalance.inner.item_3`,
              `mage.content.signs_of_imbalance.inner.item_4`,
              `mage.content.signs_of_imbalance.inner.item_5`,
              `mage.content.signs_of_imbalance.inner.item_6`,
            ]
          },
          {
            type: 'text',
            text: [`mage.content.signs_of_imbalance.inner.text_2`]
          },
        ]
      }
    ]
}

const warrior: TResultScheme = {
  title: 'warrior.title',
  subtitle: 'warrior.subtitle',
  affirmation: 'warrior.affirmation',
  gif: {
    src: '/video/archetypes/warrior.mp4'
  },
  blocks: [
    {
      title: "warrior.content.who_are_you.title",
      content: [
        {
          type: 'text',
          text: [
            `warrior.content.who_are_you.inner.text_1`,
            `warrior.content.who_are_you.inner.text_2`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.who_are_you.inner.text_3`,
            `warrior.content.who_are_you.inner.text_4`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.who_are_you.inner.text_5`,
            `warrior.content.who_are_you.inner.text_6`,
            `warrior.content.who_are_you.inner.text_7`,
            
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.who_are_you.inner.text_8`,
            `warrior.content.who_are_you.inner.text_9`,
            `warrior.content.who_are_you.inner.text_10`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.who_are_you.inner.text_11`,
            `warrior.content.who_are_you.inner.text_12`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.who_are_you.inner.text_13`,
            `warrior.content.who_are_you.inner.text_14`,
            `warrior.content.who_are_you.inner.text_15`,
          ]
        }
      ]
    },
    {
      title: `warrior.content.strengths.title`,
      content: [
        {
          type: 'list',
          text: [
            `warrior.content.strengths.inner.item_1`,
            `warrior.content.strengths.inner.item_2`,
            `warrior.content.strengths.inner.item_3`,
            `warrior.content.strengths.inner.item_4`,
            `warrior.content.strengths.inner.item_5`,
            `warrior.content.strengths.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.strengths.inner.text_1`,
          ]
        }
      ]
    },
    {
      title: `warrior.content.shadow.title`,
      content: [
        {
          type: 'text',
          text: [
            `warrior.content.shadow.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `warrior.content.shadow.inner.item_1`,
            `warrior.content.shadow.inner.item_2`,
            `warrior.content.shadow.inner.item_3`,
            `warrior.content.shadow.inner.item_4`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.shadow.inner.text_2`,
            `warrior.content.shadow.inner.text_3`,
            `warrior.content.shadow.inner.text_4`,

          ]
        }
      ]
    },
    {
      title: `warrior.content.where_you_thrive.title`,
      content: [
        {
          type: 'text',
          text: [
            `warrior.content.where_you_thrive.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `warrior.content.where_you_thrive.inner.item_1`,
            `warrior.content.where_you_thrive.inner.item_2`,
            `warrior.content.where_you_thrive.inner.item_3`,
            `warrior.content.where_you_thrive.inner.item_4`,
            `warrior.content.where_you_thrive.inner.item_5`,
            `warrior.content.where_you_thrive.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.where_you_thrive.inner.text_2`,
          ]
        }
      ]
    },
    {
      title: `warrior.content.signs_of_imbalance.title`,
      content: [
        {
          type: 'text',
          text: [
            `warrior.content.signs_of_imbalance.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `warrior.content.signs_of_imbalance.inner.item_1`,
            `warrior.content.signs_of_imbalance.inner.item_2`,
            `warrior.content.signs_of_imbalance.inner.item_3`,
            `warrior.content.signs_of_imbalance.inner.item_4`,
            `warrior.content.signs_of_imbalance.inner.item_5`,
            `warrior.content.signs_of_imbalance.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `warrior.content.signs_of_imbalance.inner.text_2`,
          ]
        }
      ]
    }
  ]
}

const sage: TResultScheme = {
  title: `sage.title`,
  subtitle: `sage.subtitle`,
  affirmation: `sage.affirmation`,
  gif: {
    src: '/video/archetypes/sage.mp4'
  },
  blocks: [
    {
      title: `sage.content.who_are_you.title`,
      content: [
        {
          type: 'text',
          text: [
            `sage.content.who_are_you.inner.text_1`,
            `sage.content.who_are_you.inner.text_2`
          ]
        },
        {
          type: 'text',
          text: [
            `sage.content.who_are_you.inner.text_3`,
            `sage.content.who_are_you.inner.text_4`,
            `sage.content.who_are_you.inner.text_5`,
          ]
        },
        {
          type: 'text',
          text: [
            `sage.content.who_are_you.inner.text_6`,
            `sage.content.who_are_you.inner.text_7`,
            `sage.content.who_are_you.inner.text_8`,
          ]
        },
        {
          type: 'text',
          text: [
            `sage.content.who_are_you.inner.text_9`,
            `sage.content.who_are_you.inner.text_10`,
          ]
        }        
      ]
    },
    {
      title: `sage.content.strengths.title`,
      content: [
        {
          type: 'list',
          text: [
            `sage.content.strengths.inner.item_1`,
            `sage.content.strengths.inner.item_2`,
            `sage.content.strengths.inner.item_3`,
            `sage.content.strengths.inner.item_4`,
            `sage.content.strengths.inner.item_5`,
            `sage.content.strengths.inner.item_6`,
          ]
        },
      ]
    },
    {
      title: `sage.content.shadow.title`,
      content: [
        {
          type: 'text',
          text: [`sage.content.shadow.inner.text_1`]
        },
        {
          type: 'list',
          text: [
            `sage.content.shadow.inner.item_1`,
            `sage.content.shadow.inner.item_2`,
            `sage.content.shadow.inner.item_3`,
            `sage.content.shadow.inner.item_4`,
            `sage.content.shadow.inner.item_5`,
            `sage.content.shadow.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [`sage.content.shadow.inner.text_2`]
        },
      ]
    },
    {
      title: `sage.content.where_you_thrive.title`,
      content: [
        {
          type: 'text',
          text: [`sage.content.where_you_thrive.inner.text_1`]
        },
        {
          type: 'list',
          text: [
            `sage.content.where_you_thrive.inner.item_1`,
            `sage.content.where_you_thrive.inner.item_2`,
            `sage.content.where_you_thrive.inner.item_3`,
            `sage.content.where_you_thrive.inner.item_4`,
            `sage.content.where_you_thrive.inner.item_5`,
            `sage.content.where_you_thrive.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [`sage.content.where_you_thrive.inner.text_2`]
        },
      ]
    },
    {
      title: `sage.content.signs_of_imbalance.title`,
      content: [
        {
          type: 'text',
          text: [`sage.content.signs_of_imbalance.inner.text_1`]
        },
        {
          type: 'list',
          text: [
            `sage.content.signs_of_imbalance.inner.item_1`,
            `sage.content.signs_of_imbalance.inner.item_2`,
            `sage.content.signs_of_imbalance.inner.item_3`,
            `sage.content.signs_of_imbalance.inner.item_4`,
            `sage.content.signs_of_imbalance.inner.item_5`,
            `sage.content.signs_of_imbalance.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [`sage.content.signs_of_imbalance.inner.text_2`]
        },
      ]
    }
  ]
}

const lover: TResultScheme = {
  title: `lover.title`,
  subtitle: `lover.subtitle`,
  affirmation: `lover.affirmation`,
  gif: { src: '/video/archetypes/lovers.mp4' },
  blocks: [
    {
      title: `lover.content.who_are_you.title`,
      content: [
        {
          type: 'text',
          text: [
            `lover.content.who_are_you.inner.text_1`,
            `lover.content.who_are_you.inner.text_2`
          ]
        },
        {
          type: 'text',
          text: [
            `lover.content.who_are_you.inner.text_3`,
            `lover.content.who_are_you.inner.text_4`,
            `lover.content.who_are_you.inner.text_5`,
          ]
        },
        {
          type: 'text',
          text: [
            `lover.content.who_are_you.inner.text_6`,
            `lover.content.who_are_you.inner.text_7`,
          ]
        },
        {
          type: 'text',
          text: [
            `lover.content.who_are_you.inner.text_8`,
          ]
        }
      ]
    },
    {
      title: `lover.content.strengths.title`,
      content: [
        {
          type: 'list',
          text: [
            `lover.content.strengths.inner.item_1`,
            `lover.content.strengths.inner.item_2`,
            `lover.content.strengths.inner.item_3`,
            `lover.content.strengths.inner.item_4`,
            `lover.content.strengths.inner.item_5`,
            `lover.content.strengths.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `lover.content.strengths.inner.text_1`,
          ]
        },
      ]
    },
    {
      title: `lover.content.shadow.title`,
      content: [
        {
          type: 'text',
          text: [
            `lover.content.shadow.inner.text_1`,
            `lover.content.shadow.inner.text_2`,
          ]
        },
        {
          type: 'list',
          text: [
            `lover.content.shadow.inner.item_1`,
            `lover.content.shadow.inner.item_2`,
            `lover.content.shadow.inner.item_3`,
            `lover.content.shadow.inner.item_4`,
            `lover.content.shadow.inner.item_5`,
            `lover.content.shadow.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `lover.content.shadow.inner.text_3`,
            `lover.content.shadow.inner.text_4`,
          ]
        },
      ]
    },
    {
      title: `lover.content.where_you_thrive.title`,
      content: [
        {
          type: 'text',
          text: [
            `lover.content.where_you_thrive.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `lover.content.where_you_thrive.inner.item_1`,
            `lover.content.where_you_thrive.inner.item_2`,
            `lover.content.where_you_thrive.inner.item_3`,
            `lover.content.where_you_thrive.inner.item_4`,
            `lover.content.where_you_thrive.inner.item_5`,
            `lover.content.where_you_thrive.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `lover.content.where_you_thrive.inner.text_2`,
            `lover.content.where_you_thrive.inner.text_3`,
          ]
        },
      ]
    },
    {
      title: `lover.content.signs_of_imbalance.title`,
      content: [
        {
          type: 'text',
          text: [
            `lover.content.signs_of_imbalance.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `lover.content.signs_of_imbalance.inner.item_1`,
            `lover.content.signs_of_imbalance.inner.item_2`,
            `lover.content.signs_of_imbalance.inner.item_3`,
            `lover.content.signs_of_imbalance.inner.item_4`,
            `lover.content.signs_of_imbalance.inner.item_5`,
            `lover.content.signs_of_imbalance.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `lover.content.signs_of_imbalance.inner.text_2`,
          ]
        },
      ]
    }
  ]
}

const creator: TResultScheme = {
  title: `creator.title`,
  subtitle: `creator.subtitle`,
  affirmation: `creator.affirmation`,
  gif: {
    src: '/video/archetypes/creator.mp4'
  },
  blocks: [
    {
      title: `creator.content.who_are_you.title`,
      content: [
        {
          type: "text",
          text: [
            `creator.content.who_are_you.inner.text_1`,
            `creator.content.who_are_you.inner.text_2`,
            `creator.content.who_are_you.inner.text_3`,
          ]
        },
        {
          type: "text",
          text: [
            `creator.content.who_are_you.inner.text_4`,
            `creator.content.who_are_you.inner.text_5`,
            `creator.content.who_are_you.inner.text_6`,
            `creator.content.who_are_you.inner.text_7`,
          ]
        },
        {
          type: "text",
          text: [
            `creator.content.who_are_you.inner.text_8`,
            `creator.content.who_are_you.inner.text_9`,
          ]
        },
        {
          type: "text",
          text: [
            `creator.content.who_are_you.inner.text_10`,
            `creator.content.who_are_you.inner.text_11`,
            `creator.content.who_are_you.inner.text_12`,
          ]
        },{
          type: "text",
          text: [
            `creator.content.who_are_you.inner.text_13`,
            `creator.content.who_are_you.inner.text_14`,
          ]
        }
      ]
    },
    {
      title: `creator.content.strengths.title`,
      content: [
        {
          type: "list",
          text: [
            `creator.content.strengths.inner.item_1`,
            `creator.content.strengths.inner.item_2`,
            `creator.content.strengths.inner.item_3`,
            `creator.content.strengths.inner.item_4`,
            `creator.content.strengths.inner.item_5`,
            `creator.content.strengths.inner.item_6`,
          ],
        },{
          type: "text",
          text: [
            `creator.content.strengths.inner.text_1`,
          ],
        }
      ]
    },
    {
      title: `creator.content.shadow.title`,
      content: [
        {
          type: "text",
          text: [
            `creator.content.shadow.inner.text_1`,
          ],
        },
        {
          type: "list",
          text: [
            `creator.content.shadow.inner.item_1`,
            `creator.content.shadow.inner.item_2`,
            `creator.content.shadow.inner.item_3`,
            `creator.content.shadow.inner.item_4`,
            `creator.content.shadow.inner.item_5`,
            `creator.content.shadow.inner.item_6`,
          ],
        },
        {
          type: "text",
          text: [
            `creator.content.shadow.inner.text_2`,
          ],
        }
      ]
    },
    {
      title: `creator.content.where_you_thrive.title`,
      content: [
        {
          type: "text",
          text: [
            `creator.content.where_you_thrive.inner.text_1`,
          ],
        },
        {
          type: "list",
          text: [
            `creator.content.where_you_thrive.inner.item_1`,
            `creator.content.where_you_thrive.inner.item_2`,
            `creator.content.where_you_thrive.inner.item_3`,
            `creator.content.where_you_thrive.inner.item_4`,
            `creator.content.where_you_thrive.inner.item_5`,
            `creator.content.where_you_thrive.inner.item_6`,
          ],
        },
        {
          type: "text",
          text: [
            `creator.content.where_you_thrive.inner.text_2`,
          ],
        }
      ]
    },
    {
      title: `creator.content.signs_of_imbalance.title`,
      content: [
        {
          type: "text",
          text: [
            `creator.content.signs_of_imbalance.inner.text_1`,
          ],
        },
        {
          type: "list",
          text: [
            `creator.content.signs_of_imbalance.inner.item_1`,
            `creator.content.signs_of_imbalance.inner.item_2`,
            `creator.content.signs_of_imbalance.inner.item_3`,
            `creator.content.signs_of_imbalance.inner.item_4`,
            `creator.content.signs_of_imbalance.inner.item_5`,
            `creator.content.signs_of_imbalance.inner.item_6`,
          ],
        },
        {
          type: "text",
          text: [
            `creator.content.signs_of_imbalance.inner.text_2`,
            `creator.content.signs_of_imbalance.inner.text_3`,
          ],
        }
      ]
    }
  ]
}

const guide: TResultScheme = {
  title: `guide.title`,
  subtitle: `guide.subtitle`,
  affirmation: `guide.affirmation`,
  gif: {
    src: '/video/archetypes/guide.mp4'
  },
  blocks: [
    {
      title: `guide.content.who_are_you.title`,
      content: [
        {
          type: 'text',
          text: [
            `guide.content.who_are_you.inner.text_1`,
            `guide.content.who_are_you.inner.text_2`,
            `guide.content.who_are_you.inner.text_3`,
          ]
        },
        {
          type: 'text',
          text: [
            `guide.content.who_are_you.inner.text_4`,
            `guide.content.who_are_you.inner.text_5`,
            `guide.content.who_are_you.inner.text_6`,
            `guide.content.who_are_you.inner.text_7`,
            `guide.content.who_are_you.inner.text_8`,
          ]
        },
        {
          type: 'text',
          text: [
            `guide.content.who_are_you.inner.text_9`,
            `guide.content.who_are_you.inner.text_10`,
            `guide.content.who_are_you.inner.text_11`,
            `guide.content.who_are_you.inner.text_12`,
          ]
        },
      ]
    },
    {
      title: `guide.content.strengths.title`,
      content: [
        {
          type: 'list',
          text: [
            `guide.content.strengths.inner.item_1`,
            `guide.content.strengths.inner.item_2`,
            `guide.content.strengths.inner.item_3`,
            `guide.content.strengths.inner.item_4`,
            `guide.content.strengths.inner.item_5`,
            `guide.content.strengths.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `guide.content.strengths.inner.text_1`,
          ]
        },
      ]
    },
    {
      title: `guide.content.shadow.title`,
      content: [
        {
          type: 'text',
          text: [
            `guide.content.shadow.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `guide.content.shadow.inner.item_1`,
            `guide.content.shadow.inner.item_2`,
            `guide.content.shadow.inner.item_3`,
            `guide.content.shadow.inner.item_4`,
            `guide.content.shadow.inner.item_5`,
            `guide.content.shadow.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `guide.content.shadow.inner.text_2`,
          ]
        },
      ]
    },
    {
      title: `guide.content.where_you_thrive.title`,
      content: [
        {
          type: 'text',
          text: [
            `guide.content.where_you_thrive.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `guide.content.where_you_thrive.inner.item_1`,
            `guide.content.where_you_thrive.inner.item_2`,
            `guide.content.where_you_thrive.inner.item_3`,
            `guide.content.where_you_thrive.inner.item_4`,
            `guide.content.where_you_thrive.inner.item_5`,
            `guide.content.where_you_thrive.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `guide.content.where_you_thrive.inner.text_2`,
          ]
        },
      ]
    },
    {
      title: `guide.content.signs_of_imbalance.title`,
      content: [
        {
          type: 'text',
          text: [
            `guide.content.signs_of_imbalance.inner.text_1`,
          ]
        },
        {
          type: 'list',
          text: [
            `guide.content.signs_of_imbalance.inner.item_1`,
            `guide.content.signs_of_imbalance.inner.item_2`,
            `guide.content.signs_of_imbalance.inner.item_3`,
            `guide.content.signs_of_imbalance.inner.item_4`,
            `guide.content.signs_of_imbalance.inner.item_5`,
            `guide.content.signs_of_imbalance.inner.item_6`,
          ]
        },
        {
          type: 'text',
          text: [
            `guide.content.signs_of_imbalance.inner.text_2`,
            `guide.content.signs_of_imbalance.inner.text_3`,
          ]
        },
      ]
    }
  ]
}

const investigator: TResultScheme = {
  title: `investigator.title`,
  subtitle: `investigator.subtitle`,
  affirmation: `investigator.affirmation`,
  blocks: [
    {
      title: `investigator.content.who_are_you.title`,
      content: [
        {
          type: 'text',
          text: [
            'investigator.content.who_are_you.inner.text_1',
            'investigator.content.who_are_you.inner.text_2',
            'investigator.content.who_are_you.inner.text_3',
          ]
        },
        {
          type: 'text',
          text: [
            'investigator.content.who_are_you.inner.text_4',
            'investigator.content.who_are_you.inner.text_5',
            'investigator.content.who_are_you.inner.text_6',
            'investigator.content.who_are_you.inner.text_7',
            'investigator.content.who_are_you.inner.text_8',
            'investigator.content.who_are_you.inner.text_9',
          ]
        },
        {
          type: 'text',
          text: [
            'investigator.content.who_are_you.inner.text_10',
            'investigator.content.who_are_you.inner.text_11',
            'investigator.content.who_are_you.inner.text_12',
            'investigator.content.who_are_you.inner.text_13',
            'investigator.content.who_are_you.inner.text_14',
          ]
        },
        {
          type: 'text',
          text: [
            'investigator.content.who_are_you.inner.text_15',
          ]
        }
      ]
    },
    {
      title: `investigator.content.strengths.title`,
      content: [
        {
          type: 'list',
          text: [
            'investigator.content.strengths.inner.item_1',
            'investigator.content.strengths.inner.item_2',
            'investigator.content.strengths.inner.item_3',
            'investigator.content.strengths.inner.item_4',
            'investigator.content.strengths.inner.item_5',
            'investigator.content.strengths.inner.item_6',
          ]
        },
        {
          type: 'text',
          text: [
            'investigator.content.strengths.inner.text_1',
          ]
        }
      ]
    },
    {
      title: `investigator.content.shadow.title`,
      content: [
        {
          type: 'text',
          text: [
            'investigator.content.shadow.inner.text_1',
            'investigator.content.shadow.inner.text_2',
          ]
        },
        {
          type: 'list',
          text: [
            'investigator.content.shadow.inner.item_1',
            'investigator.content.shadow.inner.item_2',
            'investigator.content.shadow.inner.item_3',
            'investigator.content.shadow.inner.item_4',
            'investigator.content.shadow.inner.item_5',
            'investigator.content.shadow.inner.item_6',
          ]
        },
        {
          type: 'text',
          text: [
            'investigator.content.shadow.inner.text_3',
            'investigator.content.shadow.inner.text_4',
          ]
        }
      ]
    },
    {
      title: `investigator.content.where_you_thrive.title`,
      content: [
        {
          type: 'text',
          text: [
            'investigator.content.where_you_thrive.inner.text_1',
          ]
        },
        {
          type: 'list',
          text: [
            'investigator.content.where_you_thrive.inner.item_1',
            'investigator.content.where_you_thrive.inner.item_2',
            'investigator.content.where_you_thrive.inner.item_3',
            'investigator.content.where_you_thrive.inner.item_4',
            'investigator.content.where_you_thrive.inner.item_5',
            'investigator.content.where_you_thrive.inner.item_6',
          ]
        },
        {
          type: 'text',
          text: [
            'investigator.content.where_you_thrive.inner.text_2',
          ]
        }
      ]
    },
    {
      title: `investigator.content.signs_of_imbalance.title`,
      content: [
        {
          type: 'text',
          text: [
            'investigator.content.signs_of_imbalance.inner.text_1',
          ]
        },
        {
          type: 'list',
          text: [
            'investigator.content.signs_of_imbalance.inner.item_1',
            'investigator.content.signs_of_imbalance.inner.item_2',
            'investigator.content.signs_of_imbalance.inner.item_3',
            'investigator.content.signs_of_imbalance.inner.item_4',
            'investigator.content.signs_of_imbalance.inner.item_5',
            'investigator.content.signs_of_imbalance.inner.item_6',
          ]
        },
        {
          type: 'text',
          text: [
            'investigator.content.signs_of_imbalance.inner.text_2',
          ]
        }
      ]
    }
  ]
}

export const RESULTS: {[key: string]: TResultScheme} = {
  A: mage,
  B: warrior,
  C: sage,
  D: lover,
  E: creator,
  F: guide,
  G: investigator
}