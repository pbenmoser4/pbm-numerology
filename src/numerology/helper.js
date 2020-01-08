import _ from 'lodash';

export class NumerologyHelper {
  constructor() {
    this.vowels = ['a', 'e', 'i', 'o', 'u'];
    this.skipChar = "*"
  }

  splitName = (name) => {
    const separator = " ";
    const split = name.split(separator);
    if (split.length < 3) {
      return null;
    }
    const suffixes = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
    const suffixRemoved = split.filter(name => !(suffixes.includes(name)));
    const suffix = _.difference(split, suffixRemoved);
    const firstName = suffixRemoved[0];
    const lastName = suffixRemoved[suffixRemoved.length - 1];
    const middleName = _.difference(suffixRemoved, [firstName], [lastName]).join(' ');

    return {
      "first": firstName,
      "middle": middleName,
      "last": lastName,
      "suffix": suffix.length === 1 ? suffix[0] : null
    }
  }

  charValue = letter => {
    if (letter.length === 1) {
      return ((letter.charCodeAt(0) - 97) % 9) + 1;
    } else {
      return null;
    }
  }

  numArrayToNumber = numArray => {
    return parseInt(numArray.map(n => String(n)).join(''));
  }

  stringToLowercaseArray = string => {
    return [...string.toLowerCase()];
  }

  stringArrayToNumArray = stringArray => {
    return stringArray.map(el => {
      return el === this.skipChar ? 0 : this.charValue(el)
    });
  }

  stringToNumArray = string => {
    return this.stringArrayToNumArray(this.stringToLowercaseArray(string));
  }

  charArrayToString = (array, skipChar) => {
    const skip = skipChar ? skipChar : this.skipChar;
    return array.filter(el => el !== skip).join('');
  }

  vowelsFromString = string => {
    return this.vowelsFromCharArray([...string]).join('');
  }

  vowelsFromCharArray = charArray => {
    return charArray.map(el => {
      return this.vowels.includes(el) ? el : this.skipChar;
    });
  }

  consonantsFromString = string => {
    return this.consonantsFromCharArray([...string]).join('');
  }

  consonantsFromCharArray = charArray => {
    return charArray.map(el => {
      return !this.vowels.includes(el) ? el : this.skipChar;
    });
  }

  numToNumArray = number => {
    return [...String(number)].map(el => parseInt(el));
  }

  reduceNumArray = numArray => {
    let sum = numArray.reduce((agg, cur) => agg += cur);
    if (sum < 10) {
      const firstItem = this.numArrayToNumber(numArray) < 100 ? this.numArrayToNumber(numArray) : sum;
      return [firstItem, sum];
    } else {
      return this.reduceNumArray(this.numToNumArray(sum))
    }
  }

  reduceNumArrays = numArrays => {
    const individuals = numArrays.map(arr => this.reduceNumArray(arr));
    const total = this.reduceNumArray(individuals.map(el => el[1]));
    return [...individuals, total];
  }

  reduceNumber = number => {
    return this.reduceNumArray(this.numToNumArray(number));
  }

  figureString = str => {
    return this.reduceNumArray(this.stringToNumArray(str));
  }

  figureStrings = stringArray => {
    const individuals = stringArray.map(el => this.figureString(el));
    const total = this.reduceNumArray(individuals.map(el => el[1]));
    return [...individuals, total];
  }

  namePartDateMap = (name, birthday) => {
    const maxAge = 120;
    const nameNumArray = this.stringToNumArray(name);
    const startDate = birthday;
    const startYear = startDate.getFullYear();
    const endYear = startYear + maxAge;

    let currentYear = startYear;
    let currentIteration = 0;
    const retMap = {};
    retMap[startYear] = "Br";

    while(currentYear < endYear){
      let addition = currentIteration * nameNumArray.reduce((a,b)=>a+b,0);
      nameNumArray.forEach((num, index, arr) => {
        let char = name.charAt(index);
        let baseYear = index > 0 ? startYear + arr.slice(0, index).reduce((a,b)=>a+b,0) : startYear;
        baseYear += addition;

        for (let i=0; i<num; i++){
          currentYear = baseYear + i + 1;
          retMap[currentYear] = char;
        }
      })
      currentIteration += 1;
    }
    return retMap;
  }

  getDestinyDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": `Your name destines you to leadership. If you live up to your
        name, you will become an outstanding character in some line of endeavor
        during your lifetime. Your success will come through your ability to stand
        on your own feet, think for yourself, and to individualize your character.
        You are something of a promoter by destiny and must keep things from
        crystallizing. Be strong, capable, intelligent, and your opportunities
        will come to you. Live an active life. Dullness will defeat you.`
      },
      {
        "description": "The Peacemaker",
        "detail": `You were destined by Life to play the role of “Peacemaker.”
        Good will toward others is your magic power for
        success. You have fine powers o persuasion, diplomacy and
        cooperation, but they must be carefully cultivated and brought
        to a high point of perfection, along with your other characteristics,
        if you wish to attract the good things life has in store for
        you. In other words, you are one of Life’s “trouble shooters”
        and will be called upon constantly to pour oil on troubled waters.
        Partnerships are important to you. No matter how independent
        an executive you are in other ways, cooperation is essential
        to your success. This does not mean that you should
        depend upon others for your success, but through fraternities,
        associations, groups, and in your personal and home life, you
        will find “sharing” a means to your own attainment. `
      },
      {
        "description": "The Creative Optimist",
        "detail": `You have a creative Destiny and are required to be the
        “optimist.” Your mission in life is to help people realize the
        magic power of cheer ulness and inspiration. You must realize
        this for yourself too, for “laugh and the world laughs with
        you” is one of your slogans for success. “Weep and you weep
        alone” is equally certain in your experiences. Many people
        have lost the joy of living and it is your duty and mission in life
        to arouse their imagination and spirit, until their faith in people
        and in friendship has been rekindled, and they can laugh again.`
      },
      {
        "description": "The Organizer",
        "detail": `You are destined by life to play the role of manager and
        "organizer". You are a builder, and it is your mission to make things
        permanent and lasting. You must make dreams practical and bring all
        imagination down to earth. If you wish to get the best out of life, you
        must try at all times to establish unity between the idea and the
        result. "Haste makes waste" in your affairs and carlessness can be your
        undoing. Problems through relatives may come into your life and you may
        have to take a stand for your own rights. Do not be contrary; be willing
        to help them, but build your own life after the pattern you feel brings
        security for yourself and opportunity for your talents. Mix sincerity
        with joy and you cannot fail. Also, if you are unable to express your
        ideas and character along some creative and inspirational manner, you
        should train your mind until you can do so easily and naturally. 1 his
        will open opportunities to you which you could not gain in any
        other way.  Don’t talk too much,
        or wear your heart on your sleeve, but enjoy life and help
        others enjoy life too. Keep optimistic and you will be the center
        of admiring groups. Friends are important in your life and you
        should cultivate the art of being a true friend.`
      },
      {
        "description": "The Progressive",
        "detail": `Life will bring you many experiences and a good many
        changes, some of them forced upon you, os hers of your own
        making. You may find it hard to associate yourself perma¬
        nently with the same people, work or undertaking, even though
        you may want to, for your mission in life is to promote “Free¬
        dom” and “Progress,” and to keep Life moving forward.
        When changes come unexpectedly,
        do not fear them or cling to the old. Accept the new and
        make it a stepping stone to growth and greater attainment.
        Your Destiny is a public one and you will find opportunity
        through people in general. You are likely to have more ihan
        one iron in the fire and must guard against scattering your energies.
        But you could lose your goal if not given frequent opportunity
        for exciting and interesting worldly contact. Broaden
        your life by going among people of all kinds, both religious
        and Bohemian.`
      },
      {
        "description": "The Humanitarian",
        "detail": `Service to the world is your destiny. Duty will follow you
        down life's pathway, at home and out in the world, but your success and
        personal happiness depend upon how much good you can do, and upon the
        love and sympathy you have to give to those who need it. You have an
        artistic destiny too, and part of your life's work is to beautify the
        world. Your ability to help humanity is very definite and sincere, and
        you will be called upon to do so even though you might try to avoid it.
        Don't compromise your ideals at any time. Activites which have to do
        with art, flowers, music, gardens, furniture, interior decorating, radio,
        theatre, building of homes, and along the lines of literature awaken
        your own talents. You have a good earning capacity, and if you find
        yourself without money, or drudging for others, it is because you have
        not been generous enough in your desires for the good of others.`
      },
      {
        "description": "The Educator",
        "detail": `You are destined to be one of the “educators” of the
        world. You must study, prove, test, and make sure of facts,
        until you can write, teach, or demonstrate your knowledge to
        your fellow man. Your life should be an interesting one, for
        your search after knowledge will bring you many experiences
        and unusual associations, to teach you to discriminate between
        that which is true and false. You have been destined to discover,
        uncover, and understand the mysteries of life, to delve
        into the hidden, scientific, and occult. You may even be called
        strange, different, or hard to understand. You may often feel
        that you are alone, even in the midst of people, until you learn
        to live by your own soul’s grace and not to depend upon the
        support or sympathy of others. It is your destiny to live by the
        realities of life and not by superficial standards; when you realize
        this, you will not be alone, for the world will then beat a
        path to your door for counsel, advice, and learning and to
        bask in the calm and certainty of your life.`
      },
      {
        "description": "The Dynamo",
        "detail": `You have a dynamic destiny, giving you the right to position,
        authority, money, and recognition in the world. Your reward will not
        always be in money, but in accomplishments; you must work for the love
        of doing things and find more satisfaction in the good work than in
        personal reward. When seeking to enlarge your field of opoprtunity,
        join with people who are interested in civic affairs and the government.
        Take an interest in sports, games, and the general amusements of the
        public. Philosophical, mystical, and religious lines of thought should
        be studied for your mental growth`
      },
      {
        "description": "The Beautifier",
        "detail": `You came into the world to stand for all that is fine, phil¬
        anthropic, charitable, and beautiful. Music, art, romance,
        drama, color, ideality, and perfection should be the standards
        of your life, and even the most ordinary undertaking must be
        changed from the commonplace into the lovely, by your presence,
        thought, and ways of doing things. Your opportunities in
        life are so many, so all-embracing, and life will give you so
        many gifts, that in order to keep them for yourself, you must
        represent all that is fine, true and generous to the world.
        All that you desire in
        love and companionship will come to you when you learn that
        true love is service to the many rather than to the one. To cling
        to personal love, possessions, and power too tenaciously might
        be to lose all; but when you express love as a Divine Law, you
        will then receive greater love than you have ever dreamed of.
        There will be times when you will need to increase your
        opportunities and to reach out into broader fields of endeavor.
        There is no real limitation or place or opportunity for you
        unless you make it so by careless living. People in all walks of
        life will help you and you can help them when you train your
        mind to universal thought.`
      },
    ]

    return values[number - 1];
  };

  getBirthForceDescription = (number) => {
    const values = [
      {
        "description": "Leader Type",
        "detail": `You are the leader type, strongly individualized, and demand
        the right to think and act according to your own ideas
        and convictions. You have a keen perception, good concentration,
        ability to get ahead, to direct and lead others and to
        establish your own business if you desire. You have executive
        ability, will power, courage, and are quite capable of overcoming
        any barrier to your success when you make use or your creative
        ideas. Life should never be dull for you if you make the best
        of your initiative, executive ability and original ideas, for you
        have strong powers of attraction wnich will lead you into interesting
        work and experiences. Broad vision, magnetic force, and
        inspiration enable you to carry out your plans in a big way and
        for financial reward. Avoid the negative sides of your character:
        dominance; egotism; bossy manner; impatience with the opinions
        of others; over-confidence in yoursell, or “knowing it
        all”; refusal to take advice or to be told; selfishness through
        too much interest in your own plans; and, at times, vacillation
        and indecision—all are to be avoided.

        You have unlimited opportunity through active mental interests
        and undertakings. You can be very successful through
        developing new projects, for these bring out your initiative,
        originality and executive ability. New places, new situations,
        original and unique ideas are better than old and bring out
        your latent powers of invention, promotion, origination, designing,
        illustration, writing, and speaking. Governmental activities,
        engineering, mining, business of credit, bookstores, art
        and antique shops, health matters as well as the field of medicine
        and surgery are open to you. You could work as the head
        of departments, or as director and leader of creative industry,
        and in lines of business having to do with maintenance of social
        position; also the field of amusement and entertainment is
        your scope of activity, for you have a sense of humor and enjoy
        wit and comedy. Schools and colieges may claim your interest,
        and all types of business which are outside the established order of things.`
      },
      {
        "description": "Diplomatic Type",
        "detail": `You are the diplomatic type, naturally sensitive, cooperative
        and considerate of others. There is a gentle side to your
        character and it is this which makes you more persuasive than
        forceful. You are a good mixer, able to influence others and to
        win them over to your way of thinking, especially when you
        realize the power there is in your quiet way. Your success depends very
        much on your ability to help others get what they
        want, rather than to be too selfish or self-interested.
        There are a few faults in your make-up too. Sensitiveness
        could become a fault, making you negative, fearful, timid, and
        fretful, instead of strong and courageous even in a quiet way.
        Even though you are courteous and kind, you can be surprisingly blunt
        in speech and exacting in your demands, expressing a great deal of
        nervous energy. You are something of the extremist too, strong in
        your likes and dislikes, and there is a touch of the reformer in
        your character. If you will cultivate the people who stand for
        the best in life, share what you have with others and then make
        use of your talent for doing things well, you will climb the ladder and
        stay at the top.

        Opportunity comes through fine machinery and delicate
        instruments. Also banking, as
        treasurer, teller, paymaster, accountant; and activities dealing
        with finance and money; radio, electricity, sending of mes¬
        sages, technical and mechanical pursuits; gathering o statis¬
        tics, collecting art works, tapestries, papers, pieces of money`
      },
      {
        "description": "The Creative Optimist",
        "detail": "null"
      },
      {
        "description": "Practical Type",
        "detail": `You are a practical type. You like to know just what you are
        doing and why, and do not take chances unless you are sure. You have a
        strong sense of what is right, and even though you are strong in your
        likes and dislikes, you have a natural friendliness and dignity. There
        is a fine ability in your makeup to manage, systematize, and to
        establish order and routine. Now and then you can be a little exacting,
        even a little bossy and dominant, and like to give orders rather than
        take them; and you may argue or be a little bit contrary when you do not
        have your own way; so watch out for this as it can make difficulties for
        you. But value your fine powers of management and of constructive
        endeavor, and these will take you far in the business world.`
      },
      {
        "description": "Independent Type",
        "detail": `You are the independent type. You like your freedom and have
        a natural interest in what is going on in the world and are at your best
        when you can have more than one iron in the fire. You can keep things
        moving and are a rapid, quick thinker, charged with imagination and gift
        of words; you add pep and speed to whatever you undertake. This is one
        of your attributes of business success. You can become discontented
        easily and change too readily for your own good when you allow the love
        of freedom and change to become too strong. You can be very analytical,
        sometimes unsympathetic, and like to stir things up when expressing the
        negative side of your character; but the better side of your nature is
        charitable and helpful. You may have opportunity through dealing with
        the public and its love of change and variety; advertising, publicity,
        promotion, and all lines of work which call for energizing power rather
        than routine. `
      },
      {
        "description": "The Humanitarian",
        "detail": "null"
      },
      {
        "description": "The Educator",
        "detail": "null"
      },
      {
        "description": "The Dynamo",
        "detail": "null"
      },
      {
        "description": "Philanthropic Type",
        "detail": `You are the philanthropic type. You have a deep feeling for
        mankind, sensing the heights and depths of life and the glory of
        existence. Your disposition is compassionate, generous, sympathetic,
        and tolerant, and you have a wide range of feeling, a sensitive nature,
        and a very vivid imagination. When you express your natural compassion
        you are capable of doing interesting and lasting work in the world,
        including art, philanthropy, religion, and business. You are idealistic,
        romantic, have a striking personal magnetism and a marvelous power to
        influence others for good or bad. With all your beauty of character at
        times you can be strangely uncertain, timid, vacillating, even moody,
        and show weakness of character, because you cannot reach your ideal or
        attain the perfection you so deeply realize.`
      },
    ]

    return values[number - 1];
  };

  getHeartsDesireDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": ``
      },
      {
        "description": "The Peacemaker",
        "detail": "null"
      },
      {
        "description": "The Creative Optimist",
        "detail": "null"
      },
      {
        "description": "The Organizer",
        "detail": "null"
      },
      {
        "description": "Excitement",
        "detail": `You are interested in what is going on in the world, and
        desire to be a part of it in some way. You are enthusiastic, enjoy life,
        the new, the progressive, the unusual, and seek the opportunity to
        express yourself through groups or public activity. Independent in
        thought and action, you definitely claim the right to personal freedom;
        you do not permit people or conditions to interfere with your life or to
        limit your self-expression for any length of time. Routine can easily
        become a bore to you regardless of your work or activities. You are not
        at your best when forced to do work or remain in a place which is always
        the same. You are ambitious too, but you should avoid too many irons in
        the fire, scattering your forces and finances and undertaking more than
        you can successfully carry out. Travel is good for you. When you feel
        yourself getting restless and critical or irritable, buy somthing new,
        take a trip, or make some ocnstructive change which will improve your
        work and environment.`
      },
      {
        "description": "The Humanitarian",
        "detail": "null"
      },
      {
        "description": "Perfection",
        "detail": `You are naturally selective and discriminating, for deep in
        your heart there is a desire for the best life has to offer. You aim
        high and strive for the perfect result. Your sense of the "fitness of
        things" is tremendously strong and you derive your greatest satisfaction
        from being sure everything is just right. Your ideals are well defined
        and, if possible, you refuse to accept anything if it does not measure
        up to your standards. You are often very quiet in manner and have a
        great deal of pridel From time to time you experience the desire to
        get aaway from the excitement of the world, to live a life of solitude
        and serenity on mental horizons. No matter how active your life is, you
        should daily take time to be alone and meditate, especially when you
        have a serious problem on the horizon. Your natural reserve may cause
        people to consider you distant, proud, and hard to meet. Be careful of
        your actions and allow others to discover the really generous spirit
        you have hidden beneath your cool manner.`
      },
      {
        "description": "Accomplishment",
        "detail": `Deep in your heart there is a great deal of serious ambition.
        You want to get results and have such inner fire and force that you are
        not happy unless you are doing things in a big way. You have the inner
        stamina and courage to overcome great difficulties and your latent
        ability to surmount obstacles is splendid. This courage and energy will
        eventually take you to the top of your chosen line, as you learn not to
        work for personal power alone, but for worthwhile purposes. You have the
        right to money and your abaliity should bring you success in the lines
        indicated by your Destiny and Vocation, but should you make money your
        only goal, you are likely to meet keen disappointment. You understand
        the laws of life and your ability to master your moods and to cooperate
        with others are the secret of your success in the business world. Life
        expects more out of you than of the average individual. So search your
        soul for the standards which will not fail you.`
      },
      {
        "description": "The Beautifier",
        "detail": "null"
      },
    ]

    return values[number - 1];
  };

  getPersonalityDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": ``
      },
      {
        "description": "The Peacemaker",
        "detail": "null"
      },
      {
        "description": "Friendly",
          "detail": `You are friendly and easy to talk to. Being of artistic
          nature, you like to wear jewelry and more fancy clothing. You should
          not overdress or wear extreme styles, but should be attractively
          dressed - prettily and in good materials.`
      },
      {
        "description": "The Organizer",
        "detail": "null"
      },
      {
        "description": "The Progressive",
        "detail": "null"
      },
      {
        "description": "Parental",
        "detail": `Your bearing is generally sympathetic and inspires
        confidence - the motherly or fatherly type. You often fail to give
        importance to looks or clothing, but you should always be well
        dressed and give thought to the way you look.`
      },
      {
        "description": "Close-Knit",
        "detail": `You are likeable, friendly, and a good talker when well
        acquainted, but you may seem somewhat aloof in manner and appear hard
        to know or meet. Good style is important - straight lines, with touches
        of sparkle and dash. Confidence comes to you through being well-dressed
        and in good clothing, even expensive materials`
      },
      {
        "description": "The Dynamo",
        "detail": "null"
      },
      {
        "description": "Good-Fellow",
        "detail": `You gain many friends from your warm and generous manner. You
        can influence others because of your pleasing manner, but can be distant
        and abstract when not interested. You sometimes appear to lack in
        forcefulness and attraction, although as a rule you have a magnetic
        personality.`
      },
    ]

    return values[number - 1];
  };

  getRealityDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": ``
      },
      {
        "description": "Diplomacy",
        "detail": `The field of diplomacy is open to you. The talent for getting
        on with others and bringing many together for a common good in public
        works and friendly association means success. The arts, music, museums,
        libraries give pleasure and opportunity.`
      },
      {
        "description": "Self-Expression",
        "detail": `The opportunity for a rich, full life is present, the
        privilege of true self-expression, perhaps greater than at any time
        during your life. Even if you had not previously been able to express
        the thoughts and feelings in words, music, gaiety or along any line of
        creative interest, you will be surprised at the growth and development
        which come in this respect.`
      },
      {
        "description": "The Organizer",
        "detail": "null"
      },
      {
        "description": "The Progressive",
        "detail": "null"
      },
      {
        "description": "The Humanitarian",
        "detail": "null"
      },
      {
        "description": "The Educator",
        "detail": "null"
      },
      {
        "description": "Position, Authority",
        "detail": `The promise of recognition, position, and authority for the
        latter days of like is present. Life will demand good character,
        self-discipline, courage, and executive ability. Research, investigation,
        counseling, and advisory positions give usefulness and personal
        satisfaction. Philosophical thought and interest add strength to the
        character and undertakings.`
      },
      {
        "description": "Philanthropy",
        "detail": `The world of philanthropy is the reward for your latter days
        of life. Service to mankind and the realization of the brotherhood of
        man is part of the reward. To be able to live above jealousies, fears,
        and greed of mankind is part of the victory of the latter days. The
        world of drama, art, literature, beauty in all its forms gives personal
        and financial reward.`
      },
    ]

    return values[number - 1];
  };

  getEssenceDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": `The Leader`
      },
      {
        "description": "Diplomacy",
        "detail": `Diplomacy`
      },
      {
        "description": "Self-Expression",
        "detail": `Self-Expression`
      },
      {
        "description": "The Organizer",
        "detail": `The Organizer`
      },
      {
        "description": "The Progressive",
        "detail": `The Progressive`
      },
      {
        "description": "The Humanitarian",
        "detail": `The Humanitarian`
      },
      {
        "description": "The Educator",
        "detail": `The Educator`
      },
      {
        "description": "Position, Authority",
        "detail": `Position, Authority`
      },
      {
        "description": "Philanthropy",
        "detail": `Philanthropy`
      },
    ]

    return values[number - 1];
  }

  getPersonalDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": `Between January this year and January next year, your affairs
        are making a new start. You are now entering upon a
        “new” cycle of experiences, and the next nine years of your
        life depend a great deal upon what you do now. This year is a
        time to have courage, to make plans, and to avoid inertia or in
        decision. This is not an easy year and you will need to use a great
        deal of system and organization to get the desired results. Study your
        plans and your surroundings and do not be
        afraid to take a chance with a new idea or plan, but avoid being
        impulsive or headstrong in making changes or moving forward.
        During the Spring and Summer take care of your health
        and that of loved ones. In fact, make an effort to direct all
        conditions of your life towards a more constructive expression.
        In April there is a break and a chance to move ahead. Take
        some action now for improvement. In May, rest and have
        poise; say very little. August and September, according to your
        Year Number, bring many things to a head, and the Fall can
        open the way to new opportunities and decisions you may not
        have counted upon. Keep moving forward all during the year
        for you may be able to work out your plans earlier than anticipated.
        December is a practical month—carries a practical number.
        Be very wise now and get down to work in a concrete manner, upon your
        former plans.`
      },
      {
        "description": "Diplomacy",
        "detail": `Between January this year and January next year, your
        success and happiness depend to a great extent upon how much
        tact, diplomacy, and cooperation you use in dealing with others,
        especially when things are not running smoothly. Last year
        you were required to be determined and to take the initiative.
        This year results are gained through “sharing” and willingness
        to wait for development. There is advancement and progress in
        the year; but many plans of last year cannot come to a fulfillment
        without further time to mature.
        During the early part of the year there is a tendency for
        agreements or associations to break up unless you are more
        than patient and considerate, especially during February and
        March. According to your numbers —May could find you
        deeply disturbed about what others have said or done. But
        “snap out of it” for your own good, and forget your self-importance
        for the time being. In July your numbers indicate a closing of conditions and
        you may finish up some association or arrangement by natural
        growth, or because of necessity. Show' compassion, tolerance,
        and understanding in your partnerships now. From August on,
        your Year Number indicates the opening up of new arrangements,
        new living conditions and new agreements, which il
        properly directed should bring more peace of mind and satisfaction.`
      },
      {
        "description": "Self-Expression",
        "detail": `This year you must put your best foot forward and do
        everything possible to improve yourself. Between January this
        year and January next year there is a “quickening” force operating
        in your affairs and now is the time to make use of the
        creative, inspirational, and imaginative ideas and ideals which
        flood your heart. It is important to fasten on to the dreams and
        visions which flash through your mind from time to time.
        If you will make a real effort to express and carry out some of these
        ideas in a constructive manner, this can be one of the happiest
        years of your life.
        In business, as well as friendship, inspiration and imagination can
        mean improved finances and happier associations.
        If you will make a real effort to express and carry out some of these
        ideas in a constructive manner, this can be one of the happiest
        years of your life. You should try to
        make new friends and to join with the old ones, especially
        those who are attempting to do creative and worthwhile things
        in the world. During the
        early Winter and the Spring, friends may cause you some annoyance
        or emotional disturbances, but do not allow this to get
        under your skin; try to understand your emotions and the
        things others do. Money, opportunity, love, travel, pleasure,
        happiness, and popularity should be yours this year, but dependent upon
        your own inspiration and good cheer.`
      },
      {
        "description": "The Organizer",
        "detail": `This is a very practical year for you. Between January of
        this year and January of next year, you have work to do. The
        plans and inspiration of last year must now be put into more
        concrete form. You are not likely to have much time for personal
        pleasure; circumstances from time to time will force you
        to look at things from a material point of view and to “stay on
        the job” whether you want to or not. But do not mind this, for
        by the time the year is over you will feel considerable satisfaction
        in what you have accomplished, even though you have had
        to keep “digging” and put your shoulder to the wheel.
        The practical side of the year may bring health and financial
        matters of your own or family, placing the responsibility
        upon your shoulders. You must attend to these things lovingly,
        and attempt to get orderly results this year that you may have
        the freedom and fuller life which next year promises.
        During the early Spring, strike a goal of work and routine
        and stick to it. Consider health matters in March. June shows a
        new trend of events in a practical way, with the possibility of
        decisions to be made. As this is a practical year, August shows
        the best influence for a vacation and pleasure. September
        brings many practical problems, but should show you results.
        October and its number bring the first showing of the change,
        activity, and new conditions of next year. December carries a
        quiet force. Keep poised and have faith, for Christmas will
        bring reward or the work done during the year. `
      },
      {
        "description": "The Progressive",
        "detail": `Between January this year and January next year, changing
        conditions and eventful happenings will add new life and
        color to your undertakings, forcing you into step with progress.
        After the work, application, and practical conditions of
        last year, the change, freedom from routine, and unexpectedness
        should be very agreeable to you. However, there is an element
        of uncertainty running through the year and you may
        experience a feeling of being unsettled from time to time. But
        on the whole the year affords you a splendid opportunity for
        advancement and progress. Change and the
        “new” are keynotes to the year, and you have a right to a
        fuller life than during the past few years.
        You may feel restless, impatient with things which move
        along slowly; or experience resentment towards those who hold
        you down or bind you. You should watch this, for haste makes
        waste and could lead to deep regret later on in the cycle of life
        you are now passing through. It seems to be necessary to make
        every effort to open a channel for progress, but this is not
        gained through quarreling or through burning your bridges behind
        you. If you feel that progress can come only through
        breaking up old conditions, be sure you do this in a constructive
        way and do not jump impulsively from the frying pan into
        the fire. During February keep poised and think things out quietly.
        April brings conclusions and a decision about new things. During
        the summer be careful of what you say, but push ahead.
        August brings practical problems to think about for future
        actions. September should show thrilling change or freedom.
        Your numbers say take care of your health in November.`
      },
      {
        "description": "The Humanitarian",
        "detail": `Between January this year and January next year, you
        have responsibilities to meet, obligations to pay up, and duty
        to accept, for Service is the keynote to success and happiness
        this year. In fact, this is your “duty” year, for unselfishness,
        truth, justice, charity, and humanity should be your motives in
        everything you do; it is not likely you can get satisfactory results
        any other way. A strong desire to get settled may be in your mind, both
        in business and domestic affairs, and the end oi the year should
        bring considerable satisfaction in this respect. There is something to
         be “talked over,” and it may be necessary 'or you to
        take advice from friends, relatives, or those in authority; but it
        you are willing to make the adjustment and to consider the
        good of others as well as yourself, you should realize improvement
        in all the affairs of your life.
        The action of the year is slow but it is only in this way that
        the ultimate good can be attained. This may seem to be more
        noticeable during the Spring and up to about June. But from
        then on, your plans and adjustments can be pushed forward.
        By October or November you
        should realize you have worked things out to a more definite
        conclusion; pointing towards more time to yoursek next year.
        March, according to your numbers, brings deep conclusions
        and decisions. June is a good holiday month, for July brings
        practical matters, which you, yourself, must manage. September
        brings home affairs to be lovingly handled, and December
        is again a sort of wind-up. `
      },
      {
        "description": "The Educator",
        "detail": `This is a very important year for you as so much depends
        upon a right state of mind. It is a sort of sabbatical year and
        you should spend more time than usual in quiet pursuits and be
        interested in the more intellectual phases of living.
        What you think is of great importance, for there is much
        to think out, and it is much better for you to say very little
        and to think clearly, than to fight for your rights, argue, or attempt
        to explain. This is a mental house-cleaning year and you
        should set your mental and spiritual house in order. During the
        year you will have many interesting and unusual experiences
        through being left alone and through conditions over which
        you seem to have no control. But you are laying a foundation
        of inner strength and power and for soul realization which
        will make big changes in your life. People in your home, business
        associations, and social life may be hard to understand, and you may
        experience unreasonableness in others. Just make sure you are not
        unreasonable yourself, for this could cause misunderstandings and
        disappointments in your associations. Reason things out with fairness,
        understanding, and poise, and you will find unexpected reward.
        Avoid any feeling of con usion, humiliation, or repression.
        This is a waiting year for you, but there is no real limitation
        which you cannot overcome through poise, faith, and inner attraction.`
      },
      {
        "description": "Position, Authority",
        "detail": `This year you will feel ambition stirring and a deep desire
        to better your financial conditions, so it is necessary to be very
        businesslike, efficient, and practical all through the year. There
        is a big opportunity in the year for advancement and improvement
        of your standing and credit; but conditions are not going
        to be easy, for you will be called upon to exercise good judgment
        and business efficiency. You are likely to feel a great deal of mental
        strain in making ends meet and in accomplishing what you have in mind;
        but this is a business year, and if you are efficient, turn over the
        details to others, and use your head, the year will end with an
        improvement in position and finances.
        It is very important that you do not overestimate your
        ability or the value of anything you are dealing with, especially
        in investments or in buying and selling property and in making
        exchanges. Avoid sentiment and emotion and be businesslike
        in your undertakings. About September, after you have made your business
        attempt, buying, selling, and adjusting or exchanging, you will
        begin to get a whole new idea about the reorganization of your
        affairs. You will probably decide to be done with something
        or your own good, freedom, and peace of mind. Do not be
        too materially minded now, for while money is power, you
        may find more power in being free of something than in trying
        to hang on. You may move or change your living conditions if you desire
        in the Spring, but there are a lot of little things to take care of
        before you plan ahead in April. July may bring, according to
        your numbers, an adjustment between members of the family
        and in business partnerships. August brings a feeling of being
        alone, but accept this to take time to rest and tone up your digestive
        system. September is the high point, and the Fall will be
        given over to working out the idea which comes about this
        time. November tends to give a new start from an old standpoint. `
      },
      {
        "description": "Philanthropy",
        "detail": `This year brings many of your affairs to a head. Between
        January of this year and January of next year you will realize a
        completion and also the fulfillment of some of your dreams.
        You are now closing a cycle of experience, one that you began
        nine years ago, leading to a beginning and new start with next
        year. The completion is not a failure or sorrow. It is in reality
        a reward, for through it you open the way to new opportunities
        and new interests in life. During the year you must be ready
        and willing to let go of the old and undesirable in your life to
        make way for the real and worthwhile. Be tolerant, compassionate and
        forgiving, for then you will find this one of the most wonderful years
        of your life; a reward of love, sympathy, understanding, and fulfillment
        of your plans can result and bring financial assistance
        as well as loving appreciation.
        During the early Winter and Spring, affairs should improve
        and bring you an opportunity to do what you feel is necessary,
        but during the summer you may feel alone, held back,
        and unable to keep things moving forward in a steady manner.
        Do not try to do so. Give life a chance to help you out, and
        keep your mind open to broader interests and larger activities
        which can be born now, even though not carried out fully until
        the new cycle opens with next year.
        This is not a good time to start new issues. The tide of life
        is out rather than in. Keep busy and accept opportunity if it
        comes to you, but until September you may not see the way
        clearly and will need to make changes and adjustments on account
        of the closing force of the year. Do not overwork. Take
        a vacation in July. Your health must be kept up to par, for you
        have much to do next year. The Fall of the year finds you
        marking time, going slowly, but with mutual assistance if you
        are cooperative and generous in your thought and feeling. If
        something goes out of your life, let it go, for it is clearing the
        way to your future happiness and good. `
      },
    ]

    return values[number - 1];
  }

  getUniversalDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": `The Leader`
      },
      {
        "description": "Diplomacy",
        "detail": `Diplomacy`
      },
      {
        "description": "Self-Expression",
        "detail": `Self-Expression`
      },
      {
        "description": "The Organizer",
        "detail": `The Organizer`
      },
      {
        "description": "The Progressive",
        "detail": `The Progressive`
      },
      {
        "description": "The Humanitarian",
        "detail": `The Humanitarian`
      },
      {
        "description": "The Educator",
        "detail": `The Educator`
      },
      {
        "description": "Position, Authority",
        "detail": `Position, Authority`
      },
      {
        "description": "Philanthropy",
        "detail": `Philanthropy`
      },
    ]

    return values[number - 1];
  }

  getPinnacleDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": `The Leader`
      },
      {
        "description": "Diplomacy",
        "detail": `Diplomacy`
      },
      {
        "description": "Self-Expression",
        "detail": `Self-Expression`
      },
      {
        "description": "The Organizer",
        "detail": `The Organizer`
      },
      {
        "description": "The Progressive",
        "detail": `The Progressive`
      },
      {
        "description": "The Humanitarian",
        "detail": `The Humanitarian`
      },
      {
        "description": "The Educator",
        "detail": `The Educator`
      },
      {
        "description": "Position, Authority",
        "detail": `Position, Authority`
      },
      {
        "description": "Philanthropy",
        "detail": `Philanthropy`
      },
    ]

    return values[number - 1];
  }

  getChallengeDescription = (number) => {
    const values = [
      {
        "description": "The Leader",
        "detail": `The Leader`
      },
      {
        "description": "Diplomacy",
        "detail": `Diplomacy`
      },
      {
        "description": "Self-Expression",
        "detail": `Self-Expression`
      },
      {
        "description": "The Organizer",
        "detail": `The Organizer`
      },
      {
        "description": "The Progressive",
        "detail": `The Progressive`
      },
      {
        "description": "The Humanitarian",
        "detail": `The Humanitarian`
      },
      {
        "description": "The Educator",
        "detail": `The Educator`
      },
      {
        "description": "Position, Authority",
        "detail": `Position, Authority`
      },
      {
        "description": "Philanthropy",
        "detail": `Philanthropy`
      },
    ]

    return values[number - 1];
  }
}
