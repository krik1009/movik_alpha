// api - https://pixabay.com/api/docs/

// user
// const faker = require('faker')
// const users = []
// for (let i = 0; i < 100; i++) {
//   const name = faker.name.findName()
//   const image = faker.image.avatar()
//   users.push(
//     `"fields": {"username": "${name.split(' ')[0].toLowerCase()}", "email": "${name.split(' ').join('').toLowerCase()}@email", "password": "pass", "profile_image": "${image}", "is_superuser": false, "bio": "I am ${name}. I love taking photos, watching movies and spending great time with my friends.", "is_staff": false, "is_active": true, "date_joined": "2020-06-01T12:09:53.559183Z"}`
//   )
// }
// const userJson = users.map(item => {
//   return (
//     `{"model": "users.user", "pk": ${users.indexOf(item)+5}, ${item}}`
//   )
// })
// console.log(userJson)



// categories
// const a = "backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music".split(', ')
// const b = a.map( item => (
//   `{"model": "categories.category", "pk": ${a.indexOf(item)+1}, "fields": { "name": "${item.replace(item[0], item[0].toUpperCase())}", "created_at": "2020-06-05 10:00", "owner": 1} }`
// ))
// console.log(b)



// colors
// const x = ["grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"]
// const y = x.map( item => (
//   `${item.toUpperCase()} = '${item[0]}', _('${item.replace(item[0], item[0].toUpperCase())}')`
// ))
// console.log(y)



// contents
const x = [
  {
    "id": 33194,
    "pageURL": "https://pixabay.com/videos/id-33194/",
    "type": "film",
    "tags": "sea, iceland, ocean",
    "duration": 40,
    "picture_id": "862586427",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/396036988.hd.mp4?s=d409153a1984fc0bd388cdc8d0a3a94eed888de3&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 122627669
      },
      "medium": {
        "url": "https://player.vimeo.com/external/396036988.hd.mp4?s=d409153a1984fc0bd388cdc8d0a3a94eed888de3&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 66482249
      },
      "small": {
        "url": "https://player.vimeo.com/external/396036988.hd.mp4?s=d409153a1984fc0bd388cdc8d0a3a94eed888de3&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 27581075
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/396036988.hd.mp4?s=d409153a1984fc0bd388cdc8d0a3a94eed888de3&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 13893333
      }
    },
    "views": 168360,
    "downloads": 75970,
    "favorites": 266,
    "likes": 431,
    "comments": 235,
    "user_id": 2122248,
    "user": "Roberto2016",
    "userImageURL": ""
  },
  {
    "id": 35254,
    "pageURL": "https://pixabay.com/videos/id-35254/",
    "type": "film",
    "tags": "sunrise, birds, nature",
    "duration": 29,
    "picture_id": "877697510",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/407130678.hd.mp4?s=c384238fdf4a44a7bbc197b18b1d02af34663d9e&profile_id=171",
        "width": 2560,
        "height": 1440,
        "size": 21512083
      },
      "medium": {
        "url": "https://player.vimeo.com/external/407130678.hd.mp4?s=c384238fdf4a44a7bbc197b18b1d02af34663d9e&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 20927729
      },
      "small": {
        "url": "https://player.vimeo.com/external/407130678.hd.mp4?s=c384238fdf4a44a7bbc197b18b1d02af34663d9e&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 11512470
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/407130678.hd.mp4?s=c384238fdf4a44a7bbc197b18b1d02af34663d9e&profile_id=169",
        "width": 1920,
        "height": 1080,
        "size": 11741608
      }
    },
    "views": 60495,
    "downloads": 28674,
    "favorites": 84,
    "likes": 161,
    "comments": 90,
    "user_id": 10396895,
    "user": "zaidoopro",
    "userImageURL": "https://cdn.pixabay.com/user/2019/08/30/18-22-25-105_250x250.jpg"
  },
  {
    "id": 34608,
    "pageURL": "https://pixabay.com/videos/id-34608/",
    "type": "film",
    "tags": "mountain, sky, fog",
    "duration": 21,
    "picture_id": "871858440",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/402679728.hd.mp4?s=d24e05f20b7e859ad5bc7adc30c707e689c01078&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 45009727
      },
      "medium": {
        "url": "https://player.vimeo.com/external/402679728.hd.mp4?s=d24e05f20b7e859ad5bc7adc30c707e689c01078&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 20254426
      },
      "small": {
        "url": "https://player.vimeo.com/external/402679728.hd.mp4?s=d24e05f20b7e859ad5bc7adc30c707e689c01078&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 12300877
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/402679728.hd.mp4?s=d24e05f20b7e859ad5bc7adc30c707e689c01078&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 5238715
      }
    },
    "views": 103275,
    "downloads": 50017,
    "favorites": 163,
    "likes": 261,
    "comments": 125,
    "user_id": 1846871,
    "user": "bellergy",
    "userImageURL": "https://cdn.pixabay.com/user/2016/01/05/06-31-48-75_250x250.jpg"
  },
  {
    "id": 38909,
    "pageURL": "https://pixabay.com/videos/id-38909/",
    "type": "film",
    "tags": "woman, sunset, nature",
    "duration": 29,
    "picture_id": "893617418",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/418897579.hd.mp4?s=093412e50ba8b3cc405c2a0dc0830a2ca6f4ad15&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 7397185
      },
      "medium": {
        "url": "https://player.vimeo.com/external/418897579.hd.mp4?s=093412e50ba8b3cc405c2a0dc0830a2ca6f4ad15&profile_id=171",
        "width": 2560,
        "height": 1440,
        "size": 7199386
      },
      "small": {
        "url": "https://player.vimeo.com/external/418897579.hd.mp4?s=093412e50ba8b3cc405c2a0dc0830a2ca6f4ad15&profile_id=169",
        "width": 1920,
        "height": 1080,
        "size": 5499359
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/418897579.hd.mp4?s=093412e50ba8b3cc405c2a0dc0830a2ca6f4ad15&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 5543796
      }
    },
    "views": 19276,
    "downloads": 10890,
    "favorites": 37,
    "likes": 79,
    "comments": 28,
    "user_id": 10396895,
    "user": "zaidoopro",
    "userImageURL": "https://cdn.pixabay.com/user/2019/08/30/18-22-25-105_250x250.jpg"
  },
  {
    "id": 37088,
    "pageURL": "https://pixabay.com/videos/id-37088/",
    "type": "film",
    "tags": "waterfall, water, river",
    "duration": 20,
    "picture_id": "885893632",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/413229662.hd.mp4?s=26815ea7e1ba43aa54042b394780fbde2ad33d02&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 50144937
      },
      "medium": {
        "url": "https://player.vimeo.com/external/413229662.hd.mp4?s=26815ea7e1ba43aa54042b394780fbde2ad33d02&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 32026769
      },
      "small": {
        "url": "https://player.vimeo.com/external/413229662.hd.mp4?s=26815ea7e1ba43aa54042b394780fbde2ad33d02&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 14074868
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/413229662.hd.mp4?s=26815ea7e1ba43aa54042b394780fbde2ad33d02&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 7176683
      }
    },
    "views": 31658,
    "downloads": 18267,
    "favorites": 58,
    "likes": 112,
    "comments": 68,
    "user_id": 16211452,
    "user": "Nomad_Nation_Videos",
    "userImageURL": "https://cdn.pixabay.com/user/2020/04/24/13-40-43-715_250x250.png"
  },
  {
    "id": 39513,
    "pageURL": "https://pixabay.com/videos/id-39513/",
    "type": "animation",
    "tags": "fantasy, flash, fog",
    "duration": 25,
    "picture_id": "898899672",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/422737559.hd.mp4?s=e0e5ca5f7d525c3b988e10c9462074a82ae36b35&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 18676157
      },
      "medium": {
        "url": "https://player.vimeo.com/external/422737559.hd.mp4?s=e0e5ca5f7d525c3b988e10c9462074a82ae36b35&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 9735921
      },
      "small": {
        "url": "https://player.vimeo.com/external/422737559.sd.mp4?s=f6df3cebc769aabc82a0eea46f791b6f0056fc34&profile_id=165",
        "width": 960,
        "height": 540,
        "size": 6021014
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/422737559.sd.mp4?s=f6df3cebc769aabc82a0eea46f791b6f0056fc34&profile_id=164",
        "width": 640,
        "height": 360,
        "size": 2144286
      }
    },
    "views": 3911,
    "downloads": 1860,
    "favorites": 14,
    "likes": 34,
    "comments": 6,
    "user_id": 2757803,
    "user": "silvioross",
    "userImageURL": "https://cdn.pixabay.com/user/2017/06/02/14-01-34-919_250x250.jpg"
  },
  {
    "id": 38678,
    "pageURL": "https://pixabay.com/videos/id-38678/",
    "type": "film",
    "tags": "nature, water, flower",
    "duration": 31,
    "picture_id": "893208116",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/418590139.hd.mp4?s=391521bc0ec2bf77e02c03434f7984305a5e3256&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 23034812
      },
      "medium": {
        "url": "https://player.vimeo.com/external/418590139.hd.mp4?s=391521bc0ec2bf77e02c03434f7984305a5e3256&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 12060471
      },
      "small": {
        "url": "https://player.vimeo.com/external/418590139.sd.mp4?s=077c06e7208508eb90daec7a1441fc72ff80bda9&profile_id=165",
        "width": 960,
        "height": 540,
        "size": 7279752
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/418590139.sd.mp4?s=077c06e7208508eb90daec7a1441fc72ff80bda9&profile_id=164",
        "width": 640,
        "height": 360,
        "size": 2647205
      }
    },
    "views": 13488,
    "downloads": 7303,
    "favorites": 23,
    "likes": 58,
    "comments": 30,
    "user_id": 12967658,
    "user": "Ambient_Nature_Atmosphere",
    "userImageURL": "https://cdn.pixabay.com/user/2019/09/12/10-50-15-943_250x250.jpg"
  },
  {
    "id": 34826,
    "pageURL": "https://pixabay.com/videos/id-34826/",
    "type": "film",
    "tags": "daffodil, narcissus, easter",
    "duration": 59,
    "picture_id": "873368697",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/403777550.hd.mp4?s=2317662f5d6d3710a232e43b623e0a35d0741d21&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 79232978
      },
      "medium": {
        "url": "https://player.vimeo.com/external/403777550.hd.mp4?s=2317662f5d6d3710a232e43b623e0a35d0741d21&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 31980515
      },
      "small": {
        "url": "https://player.vimeo.com/external/403777550.hd.mp4?s=2317662f5d6d3710a232e43b623e0a35d0741d21&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 22567559
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/403777550.hd.mp4?s=2317662f5d6d3710a232e43b623e0a35d0741d21&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 5633029
      }
    },
    "views": 61924,
    "downloads": 21935,
    "favorites": 82,
    "likes": 163,
    "comments": 73,
    "user_id": 4994132,
    "user": "adege",
    "userImageURL": "https://cdn.pixabay.com/user/2019/11/12/18-53-20-554_250x250.jpg"
  },
  {
    "id": 40399,
    "pageURL": "https://pixabay.com/videos/id-40399/",
    "type": "animation",
    "tags": "romance, love, rose",
    "duration": 21,
    "picture_id": "902981406",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/425442538.hd.mp4?s=84bd558870dd62aaf0432e898d3e50e18dd54f14&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 11948458
      },
      "medium": {
        "url": "https://player.vimeo.com/external/425442538.hd.mp4?s=84bd558870dd62aaf0432e898d3e50e18dd54f14&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 7361730
      },
      "small": {
        "url": "https://player.vimeo.com/external/425442538.hd.mp4?s=84bd558870dd62aaf0432e898d3e50e18dd54f14&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 3094495
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/425442538.sd.mp4?s=6922662d8b45fc1916d7838a7f96ce9d3ce6f080&profile_id=165",
        "width": 960,
        "height": 540,
        "size": 1912149
      }
    },
    "views": 126,
    "downloads": 70,
    "favorites": 2,
    "likes": 7,
    "comments": 1,
    "user_id": 9869182,
    "user": "ChristianBodhi",
    "userImageURL": "https://cdn.pixabay.com/user/2018/08/25/02-25-27-822_250x250.jpg"
  },
  {
    "id": 31377,
    "pageURL": "https://pixabay.com/videos/id-31377/",
    "type": "film",
    "tags": "nature, waves, ocean",
    "duration": 29,
    "picture_id": "849251489",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/386628887.hd.mp4?s=ae3df9c72e0a7101078c7fcfd303be25802b377a&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 89214820
      },
      "medium": {
        "url": "https://player.vimeo.com/external/386628887.hd.mp4?s=ae3df9c72e0a7101078c7fcfd303be25802b377a&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 48609576
      },
      "small": {
        "url": "https://player.vimeo.com/external/386628887.hd.mp4?s=ae3df9c72e0a7101078c7fcfd303be25802b377a&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 20256277
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/386628887.hd.mp4?s=ae3df9c72e0a7101078c7fcfd303be25802b377a&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 10187201
      }
    },
    "views": 122932,
    "downloads": 62464,
    "favorites": 214,
    "likes": 326,
    "comments": 115,
    "user_id": 14954769,
    "user": "spaceX55",
    "userImageURL": "https://cdn.pixabay.com/user/2020/01/18/09-52-36-876_250x250.jpg"
  },
  {
    "id": 39957,
    "pageURL": "https://pixabay.com/videos/id-39957/",
    "type": "animation",
    "tags": "yogi, buddha, buddhism",
    "duration": 40,
    "picture_id": "899781671",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/423362258.hd.mp4?s=361b980ad14fde944f516e2f4587feedf2ea8c91&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 28040111
      },
      "medium": {
        "url": "https://player.vimeo.com/external/423362258.hd.mp4?s=361b980ad14fde944f516e2f4587feedf2ea8c91&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 14055313
      },
      "small": {
        "url": "https://player.vimeo.com/external/423362258.sd.mp4?s=49cc9301d8f8f98d49f53ac8f95c84df02ce8e90&profile_id=165",
        "width": 960,
        "height": 540,
        "size": 8206140
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/423362258.sd.mp4?s=49cc9301d8f8f98d49f53ac8f95c84df02ce8e90&profile_id=164",
        "width": 640,
        "height": 360,
        "size": 2755556
      }
    },
    "views": 2134,
    "downloads": 962,
    "favorites": 8,
    "likes": 18,
    "comments": 7,
    "user_id": 9869182,
    "user": "ChristianBodhi",
    "userImageURL": "https://cdn.pixabay.com/user/2018/08/25/02-25-27-822_250x250.jpg"
  },
  {
    "id": 34091,
    "pageURL": "https://pixabay.com/videos/id-34091/",
    "type": "film",
    "tags": "washing hands, coronavirus, stop the spread",
    "duration": 24,
    "picture_id": "868131011",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/399913636.hd.mp4?s=ec8c3bcf6597f7f5cfe3098d5edddb5ecd28c179&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 42594893
      },
      "medium": {
        "url": "https://player.vimeo.com/external/399913636.hd.mp4?s=ec8c3bcf6597f7f5cfe3098d5edddb5ecd28c179&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 23362068
      },
      "small": {
        "url": "https://player.vimeo.com/external/399913636.hd.mp4?s=ec8c3bcf6597f7f5cfe3098d5edddb5ecd28c179&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 15223013
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/399913636.hd.mp4?s=ec8c3bcf6597f7f5cfe3098d5edddb5ecd28c179&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 8253806
      }
    },
    "views": 116807,
    "downloads": 41637,
    "favorites": 79,
    "likes": 171,
    "comments": 77,
    "user_id": 2022093,
    "user": "jLasWilson",
    "userImageURL": "https://cdn.pixabay.com/user/2020/01/14/10-15-01-694_250x250.jpg"
  },
  {
    "id": 35908,
    "pageURL": "https://pixabay.com/videos/id-35908/",
    "type": "film",
    "tags": "elster, birds, tree",
    "duration": 59,
    "picture_id": "879640404",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/408654256.hd.mp4?s=76b0dbe7958f891ab0179966828ff2f62f7810f6&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 42601171
      },
      "medium": {
        "url": "https://player.vimeo.com/external/408654256.hd.mp4?s=76b0dbe7958f891ab0179966828ff2f62f7810f6&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 22159848
      },
      "small": {
        "url": "https://player.vimeo.com/external/408654256.sd.mp4?s=2a567ec9cdbe535f9e984901fc7cf25ed5d29d91&profile_id=165",
        "width": 960,
        "height": 540,
        "size": 12805129
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/408654256.sd.mp4?s=2a567ec9cdbe535f9e984901fc7cf25ed5d29d91&profile_id=164",
        "width": 640,
        "height": 360,
        "size": 4649043
      }
    },
    "views": 30437,
    "downloads": 15457,
    "favorites": 34,
    "likes": 105,
    "comments": 62,
    "user_id": 4994132,
    "user": "adege",
    "userImageURL": "https://cdn.pixabay.com/user/2019/11/12/18-53-20-554_250x250.jpg"
  },
  {
    "id": 38451,
    "pageURL": "https://pixabay.com/videos/id-38451/",
    "type": "film",
    "tags": "surfer, surfing, beach",
    "duration": 20,
    "picture_id": "892456844",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/418027142.hd.mp4?s=b850d8f83c61ed3e999e61528d7855d734d7b5e5&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 58947799
      },
      "medium": {
        "url": "https://player.vimeo.com/external/418027142.hd.mp4?s=b850d8f83c61ed3e999e61528d7855d734d7b5e5&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 34708892
      },
      "small": {
        "url": "https://player.vimeo.com/external/418027142.hd.mp4?s=b850d8f83c61ed3e999e61528d7855d734d7b5e5&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 14666782
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/418027142.hd.mp4?s=b850d8f83c61ed3e999e61528d7855d734d7b5e5&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 6368162
      }
    },
    "views": 9227,
    "downloads": 5143,
    "favorites": 21,
    "likes": 50,
    "comments": 18,
    "user_id": 9869182,
    "user": "ChristianBodhi",
    "userImageURL": "https://cdn.pixabay.com/user/2018/08/25/02-25-27-822_250x250.jpg"
  },
  {
    "id": 38461,
    "pageURL": "https://pixabay.com/videos/id-38461/",
    "type": "film",
    "tags": "water, palm trees, sea",
    "duration": 31,
    "picture_id": "892457140",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/418027174.hd.mp4?s=90a6d0feec0dda8139884d82aa01f36120663158&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 22948110
      },
      "medium": {
        "url": "https://player.vimeo.com/external/418027174.hd.mp4?s=90a6d0feec0dda8139884d82aa01f36120663158&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 12085929
      },
      "small": {
        "url": "https://player.vimeo.com/external/418027174.sd.mp4?s=37375297983a16bccc8203f4c5c8c931e0e7ac0b&profile_id=165",
        "width": 960,
        "height": 540,
        "size": 7501567
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/418027174.sd.mp4?s=37375297983a16bccc8203f4c5c8c931e0e7ac0b&profile_id=164",
        "width": 640,
        "height": 360,
        "size": 2673050
      }
    },
    "views": 10314,
    "downloads": 5511,
    "favorites": 21,
    "likes": 44,
    "comments": 19,
    "user_id": 11517010,
    "user": "Relaxing_Guru",
    "userImageURL": "https://cdn.pixabay.com/user/2020/01/26/13-49-42-613_250x250.png"
  },
  {
    "id": 34841,
    "pageURL": "https://pixabay.com/videos/id-34841/",
    "type": "animation",
    "tags": "jesus, christ, god",
    "duration": 11,
    "picture_id": "873368798",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/403777609.hd.mp4?s=719b3200c8be4f65e152b112c26e3091b27af3cb&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 2263602
      },
      "medium": {
        "url": "https://player.vimeo.com/external/403777609.hd.mp4?s=719b3200c8be4f65e152b112c26e3091b27af3cb&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 1326975
      },
      "small": {
        "url": "https://player.vimeo.com/external/403777609.sd.mp4?s=f269192b517644f7839eb7d1967b6ff410435dfa&profile_id=165",
        "width": 960,
        "height": 540,
        "size": 923650
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/403777609.sd.mp4?s=f269192b517644f7839eb7d1967b6ff410435dfa&profile_id=164",
        "width": 640,
        "height": 360,
        "size": 453707
      }
    },
    "views": 34543,
    "downloads": 18494,
    "favorites": 73,
    "likes": 125,
    "comments": 54,
    "user_id": 7438739,
    "user": "jeffjacobs1990",
    "userImageURL": "https://cdn.pixabay.com/user/2018/02/13/00-08-15-179_250x250.jpg"
  },
  {
    "id": 33898,
    "pageURL": "https://pixabay.com/videos/id-33898/",
    "type": "film",
    "tags": "forest, nature, landscape",
    "duration": 28,
    "picture_id": "867061825",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/399148537.hd.mp4?s=4a61b6919e82f22761b87eff9e2be44567d94358&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 86898827
      },
      "medium": {
        "url": "https://player.vimeo.com/external/399148537.hd.mp4?s=4a61b6919e82f22761b87eff9e2be44567d94358&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 47102735
      },
      "small": {
        "url": "https://player.vimeo.com/external/399148537.hd.mp4?s=4a61b6919e82f22761b87eff9e2be44567d94358&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 19727114
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/399148537.hd.mp4?s=4a61b6919e82f22761b87eff9e2be44567d94358&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 9872184
      }
    },
    "views": 42058,
    "downloads": 23692,
    "favorites": 86,
    "likes": 155,
    "comments": 73,
    "user_id": 4978945,
    "user": "newarta",
    "userImageURL": "https://cdn.pixabay.com/user/2017/06/10/12-40-42-296_250x250.jpg"
  },
  {
    "id": 35506,
    "pageURL": "https://pixabay.com/videos/id-35506/",
    "type": "film",
    "tags": "ink, paint, water",
    "duration": 29,
    "picture_id": "876215818",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/405897842.hd.mp4?s=5c2a660ef4ab8187e97d57eedb8110606f349bc0&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 93081669
      },
      "medium": {
        "url": "https://player.vimeo.com/external/405897842.hd.mp4?s=5c2a660ef4ab8187e97d57eedb8110606f349bc0&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 40040221
      },
      "small": {
        "url": "https://player.vimeo.com/external/405897842.hd.mp4?s=5c2a660ef4ab8187e97d57eedb8110606f349bc0&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 21257454
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/405897842.hd.mp4?s=5c2a660ef4ab8187e97d57eedb8110606f349bc0&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 9725885
      }
    },
    "views": 34087,
    "downloads": 17968,
    "favorites": 70,
    "likes": 118,
    "comments": 36,
    "user_id": 3656355,
    "user": "Engin_Akyurt",
    "userImageURL": "https://cdn.pixabay.com/user/2018/09/20/08-02-23-312_250x250.jpg"
  },
  {
    "id": 36002,
    "pageURL": "https://pixabay.com/videos/id-36002/",
    "type": "film",
    "tags": "along the river, nature, forest",
    "duration": 47,
    "picture_id": "879339970",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/408416886.hd.mp4?s=33e282afa3e7a14a53213130083de7b7a2327da9&profile_id=172",
        "width": 3840,
        "height": 2160,
        "size": 143463508
      },
      "medium": {
        "url": "https://player.vimeo.com/external/408416886.hd.mp4?s=33e282afa3e7a14a53213130083de7b7a2327da9&profile_id=170",
        "width": 2560,
        "height": 1440,
        "size": 78388244
      },
      "small": {
        "url": "https://player.vimeo.com/external/408416886.hd.mp4?s=33e282afa3e7a14a53213130083de7b7a2327da9&profile_id=175",
        "width": 1920,
        "height": 1080,
        "size": 32856168
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/408416886.hd.mp4?s=33e282afa3e7a14a53213130083de7b7a2327da9&profile_id=174",
        "width": 1280,
        "height": 720,
        "size": 16489394
      }
    },
    "views": 18869,
    "downloads": 12184,
    "favorites": 47,
    "likes": 101,
    "comments": 46,
    "user_id": 4978945,
    "user": "newarta",
    "userImageURL": "https://cdn.pixabay.com/user/2017/06/10/12-40-42-296_250x250.jpg"
  },
  {
    "id": 33212,
    "pageURL": "https://pixabay.com/videos/id-33212/",
    "type": "film",
    "tags": "tree, forrest, nature",
    "duration": 32,
    "picture_id": "862035621",
    "videos": {
      "large": {
        "url": "https://player.vimeo.com/external/395657672.hd.mp4?s=775d23924b118ab0358b4177b051e6fc96b79207&profile_id=170",
        "width": 2732,
        "height": 1440,
        "size": 51365605
      },
      "medium": {
        "url": "https://player.vimeo.com/external/395657672.hd.mp4?s=775d23924b118ab0358b4177b051e6fc96b79207&profile_id=175",
        "width": 2048,
        "height": 1079,
        "size": 21638949
      },
      "small": {
        "url": "https://player.vimeo.com/external/395657672.hd.mp4?s=775d23924b118ab0358b4177b051e6fc96b79207&profile_id=174",
        "width": 1366,
        "height": 720,
        "size": 11053835
      },
      "tiny": {
        "url": "https://player.vimeo.com/external/395657672.sd.mp4?s=82b89e372c1eacf3f0a28112e4acbbaded81011f&profile_id=165",
        "width": 960,
        "height": 506,
        "size": 5779365
      }
    },
    "views": 40612,
    "downloads": 24116,
    "favorites": 118,
    "likes": 179,
    "comments": 83,
    "user_id": 1864548,
    "user": "fasilkkme",
    "userImageURL": ""
  }
]

const tags = [ 'sea', 'iceland', 'ocean', 'sunrise', 'birds', 'nature', 'mountain', 'sky', 'fog', 'woman', 'sunset', 'nature', 'waterfall', 'water', 'river', 'fantasy', 'flash', 'fog', 'nature', 'water', 'flower', 'daffodil', 'narcissus', 'easter', 'romance', 'love', 'rose', 'nature', 'waves', 'ocean', 'yogi', 'buddha', 'buddhism', 'washing hands', 'coronavirus', 'stop the spread', 'elster', 'birds', 'tree', 'surfer', 'surfing', 'beach', 'water', 'palm trees', 'sea', 'jesus', 'christ', 'god', 'forest', 'nature', 'landscape', 'ink', 'paint', 'water', 'along the river', 'nature', 'forest', 'tree', 'forrest', 'nature' ]

const tagJson = []
tags.map(item => {
  const x = tags.slice(tags.indexOf(item)+1, tags.length)
  if (x.find(i => i === item)) return
  else tagJson.push(item)
})
// const n = tagJson.map(item => {
//   return (
//     `{"model": "tags.tag", "pk": ${tagJson.indexOf(item)+1}, "fields": { "name": "${item}", "created_at": "2020-06-05 10:00", "owner": 1} }`
//   )
// })
// console.log(n, tagJson)
const z = x.map( item => {
  item.picture_id
})

const y = x.map( item => {
  const tags = item.tags.split(', ')
  const tag1 = tagJson.indexOf(tags[0]) === -1 ? 1 : tagJson.indexOf(tags[0])+1
  const tag2 = tagJson.indexOf(tags[1]) === -1 ? 3 : tagJson.indexOf(tags[1])+1
  const tag3 = tagJson.indexOf(tags[2]) === -1 ? 5 : tagJson.indexOf(tags[2])+1
  // return (`[${tag1}, ${tag2}, ${tag3}]`)
  return (
    `{"model": "contents.content", "pk": ${x.indexOf(item)+1}, "fields":{ "title":"${item.type} - ${tags[0]}", "thumbnail": "https://i.vimeocdn.com/video/${item.picture_id}_1920x1080.jpg", "video": "${item.videos.large.url}", "description": "The ${item.type} is created by...", "duration": "00 00:00:${item.duration}", "height": ${item.videos.large.height}, "width": ${item.videos.large.width}, "lang": "en", "isEditorsChoice": false, "isSafeSearch": true, "owner": 1, "tags": [${tag1}, ${tag2}, ${tag3}], "created_at": "2020-06-05 10:00"}}`
  )
  })

console.log(y)