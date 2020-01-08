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
        "detail": `Your name destines you to Leadership. You must
        gain this position through your own initiative, independence,
        and originality of thought and method. If you live up to your
        name, you will become an outstanding character in some line
        of endeavor during your lifetime. Your life is destined to be an
        interesting one, with many odd and strange experiences; all for
        fhe purpose of developing your will and determination. Your
        success will come through your ability to stand on your own
        feet, think for yourself, and to individualize your character.
        This does not mean that you must be aggressive or dominant;
        but instead, to be strong, self-reliant, and determined to get on
        in the world by your own ability. Life will never let you down
        if you use a fine, constructive will-power in overcoming obstacles
        and meet your problems with courage and originality. Do
        not be afraid to get off the beaten track. Just be sure your plan
        is constructive and this will open the door to leadership and independence.
        Teach others true leadership.\n\n
        There will be times when you need to broaden your opportunities.
        At such times investigate new ideas, new things and
        original and unique activities. If you are compelled to deal with
        old and established lines oi work, put new and original methods
        into the undertakings. You are something of a promoter by
        destiny and must keep things from crystallizing. Undeveloped
        projects give you opportunity to show your initiative and executive
        ability. If you find yourself in, or remaining in, a subordinate
        position without hope of progress, it means that you
        are not making a consistent effort towards self-improvement
        or using your ideas to good advantage. Do not be different to
        be prominent. Just be strong, capable, intelligent, and your opportunities
        will come to you. Mix with people who are doing
        original things and have ambition to promote and engineer the
        causes of civilization; this will fire your ambition to use your
        own ideas. Live an active life. Dullness will defeat you. Make
        your home and surroundings artistic and interesting. Use your
        natural magnetic force to attract those who will help you and
        whom you can help. You have a fine Destiny. Keep life moving
        onward.\n\n When seeking opportunity wear becoming shades of
        flame, lilac, or crimson.`
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
        You may not always want to do so, but you came into the
        world with this mission to fulfill, so it must be done, not only
        for the sake of success, but for your own peace and happiness.
        When tnings are not moving along smoothly, try tact, diplomacy
        and courtesy; for arbitration is one of your tools of
        trade. Avoid falling into the struggle for existence. Bring others
        together diplomatically; soothe, comfort, advise, counsel,
        and help people find peace, for this will give you great personal
        satisfaction and add to your commercial value.\n\n
        Partnerships are important to you. No matter how independent
        an executive you are in other ways, cooperation is essential
        to your success. This does not mean that you should
        depend upon others for your success, but through fraternities,
        associations, groups, and in your personal and home life, you
        will find “sharing” a means to your own attainment.
        Mix with people who are working for the refinement of
        the masses and who express the cultural standards of living.
        You have a fine power to influence people and it is a part of
        your mission as a peacemaker to encourage others to live by
        the higher principles of being. You are sensitive too, and should
        appreciate how others eel, and your understanding and persuasive
        manner give you ability to encourage and comfort
        others. Your own home, personality, character, and way of doing
        things should represent beauty, art, and loveliness, if at
        any time you find yourself living in inharmonious and unhappy
        surroundings, or there are jealousies and opposition in your
        home or business, you should make every effort to overcome
        this by being more cooperative and peaceful in your own actions;
        not weak or fearful, but willing to work for the good of
        your associates as much as for yourself. People who are interested
        in religion, politics, banking, science, statistics, higher
        mechanics, are in your field of opportunity. When seeking opportunity
        wear white, salmon, gold, or garnet. `
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
        and in friendship has been rekindled, and they can laugh
        again. This may not always be easy for you to do, but this is a
        part of your success and you should make every effort to live
        up to it. You were destined to be popular, to have love, romance
        and money, but this will come to you only as you express
        beauty, art and inspiration in your own life. Dare to
        laugh at troubles. Mix sincerity with joy and you cannot fail.
        Also, if you are unable to express your ideas and character
        along some creative and inspirational manner, you should train
        your mind until you can do so easily and naturally. 1 his will
        open opportunities to you which you could not gain in any
        other way.\n\n
        There will be times when you will need to broaden your
        opportunities. At such times investigate some of the worldly
        activities which are more creative, fanciful and artistic than the
        ordinary, practical lines of endeavor. Study and engage in interests
        which will give you more ease of expression in words
        and feeling, whether in literature, drama, commerce, or business.
        You have a part to play, even a career, along the lines of
        imagination and creative undertakings. The art of words, constructively
        used, will take you far in life. Don’t talk too much,
        or wear your heart on your sleeve, but enjoy life and help
        others enjoy life too. Keep optimistic and you will be the center
        of admiring groups. Friends are important in your life and you
        should cultivate the art of being a true friend. Mix with people
        who have a constructive philosophy and a comeback when
        things go wrong. Do not be afraid o the public; take an interest
        in the opera, theatre, charity, children, all the arts and
        crafts, religion, and all activities which amuse, entertain, and
        inspire the people. Through these you will find help, assistance
        and friendship and be able to do good in the world. `
      },
      {
        "description": "The Organizer",
        "detail": `You are destined by life to play the role of manager and
        “organizer.” You are a builder, and it is your mission to make
        things permanent and lasting. You must make dreams practical
        and bring all imagination down to earth. Life will not permit
        you to take things easy and you may meet many serious problems
        until you become proficient in establishing system, order,
        form, and regulation in your business and personal problems.
        You may not always want to do this, but if you wish to get the
        best out of life, you must try at all times to establish unity between
        the idea and the result; for you were born to take responsibility,
        and others will ask you for support and protection.
        Your lasting success depends upon building from the ground
        up regardless o the kind of work you undertake. Or, at least
        you must strive for tangible results and give plans form and
        body. “Haste makes waste” in your affairs and carelessness
        can be your undoing. Any change or new plan must lead to
        better order, management and security. You were destined
        from birth to stand for the principles of honesty, sincerity, patience,
        perseverance, determination and faith. Keep these for
        your plan of life and your work will live after you. \n\n
        There will be times when you will need to broaden your
        opportunities. At such times, investigate undertakings which
        have to do with buying, selling, exchange, building, engineering,
        regulation of ceremonies, education, administration, employment,
        and the maintaining of established order and system.
        Even it' you deal with religion or abstract ideas, you must see
        that they are organized for others to use. Your own success depends
        upon your ability to establish system and order in your
        undertakings. Mix with people who are doing practical but
        worthwhile things. You can make lasting and helpful friends
        among scientists, organizers, lawyers, and promoters of the
        standards of living. Do not be careless in the selection of
        friends. Morals are part of your charm and attraction in friendships;
        try for a feeling of unity with all people. This will add to
        your success and popularity. Problems through relatives may
        come into your life and you may have to take a stand for your
        own rights. Do not be contrary; be willing to help them, but
        build your life after the pattern you feel is security for yourself
        and opportunity for your talents. You must be a strong character. `
      },
      {
        "description": "The Progressive",
        "detail": `Life will bring you many experiences and a good many
        changes, some of them forced upon you, os hers of your own
        making. You may find it hard to associate yourself permanently
        with the same people, work or undertaking, even though
        you may want to, for your mission in life is to promote “Freedom”
        and “Progress,” and to keep Life moving forward. AM
        progress comes through change, new ideas, new methods and
        renewal, and only by letting go of the old, can the new be realized.
        You must learn this lesson, for you came into the world
        to be one of those who stand for liberty for all as we 1 as for
        the few. You must help people learn to live more fully and happily,
        and to know for yourself that lasting happiness cannot exist
        when the right o be free is not fully guaranteed. If your life
        is not free, cultivate the resourcefulness and versatility which is
        in your makeup and use your cseverness to keep up-to-date and
        in the stream of world progress. When changes come unexpectedly,
        do not fear them or cling to the old. Accept the new and
        make it a stepping stone to growth and greater attainment. To
        be free does not mean to break conventions deliberately. Progress
        is not rebellion. Instead, it stands for enlightenment, courage,
        ambition and willingness to learn. Keep your face turned
        towards the light and the best there is in the world. Refuse to
        be left behind in the race. Be a lawmaker, but combine charity
        and tolerance with instruction.\n\n
        Your Destiny is a public one and you will find opportunity
        through people in general. You are likely to have more ihan
        one iron in the fire and must guard against scattering your energies.
        But you could lose your goal if not given frequent opportunity
        for exciting and interesting worldly contact. Broaden
        your life by going among people of all kinds, both religious
        and Bohemian. Mix with people who promote new lines of education
        and thought. Enter into the social activities of the public.
        Go among people who write, such as columnists, newspaper
        writers. The legal profession gives you opportunity and nelpful
        friends. Publicity, advertising, and all fields of selling and public
        entertainment give you interest and development. Don’t be
        a rolling stone gathering no moss, but be a part of what is going
        on in the world. `
      },
      {
        "description": "The Humanitarian",
        "detail": `Service to the world is your Destiny. You are the ‘
        humanitarian” and it is your mission in life to comfort the suffering,
        weak, and unhappy. Duty will follow you down life’s pathway,
        at home and out in the world, but your success and personal
        happiness depend upon how much good you can do, and upon
        the iove and sympathy you have to give to those who need it or
        ask for help. You should not sacrifice your life for duty, for
        the world looks to you to maintain its ideals of charity, service,
        truth, and justice. You have an artistic Destiny too, and part
        of your life’s work is to beautify this old world of ours. Hamony,
        beauty, and the ideals of love and companionship must
        be incorporated into everything you do if you wish to get the
        reward of honor which your name destines you to. I ,'owers,
        gardens, homes, nature, and mankind should spring into beauty
        at your touch. You must keep the Golden Rule of trutn and
        justice before the minds and hearts of people, for you are a
        teacher too. Your ability to help the race is very definite and
        sincere, and you will be called upon to do so even though you
        might try to avoid it. Don’t compromise with your ideals at
        any time. Give a helping hand when trouble knocks at another’s
        door. Then in surprising ways, you will find yourself surrounded
        by love, luxury, and comfort, and a happy home life
        will crown your effort. \n\n
        Because of your ideals and your ability to serve humanity,
        you should join with those who are working along the same
        lines. Religious activities, welfare work, all lines of race education,
        especially those dealing with children and the helpless
        give you interest and open a field of usefulness. Nurses, doctors,
        musicians, actors, singers, poets, and dreamers should be
        among your friends. Activities which have to do with art,
        flowers, music, gardens, furniture, interior decorating, radio,
        theatre, building of homes, and along the lines of literature
        awaken your own talents. Farmers, ranchers, horticulturists,
        miners, engineers should be on your list of acquaintances of
        those you can help and who can help you. You have a good
        earning capacity and if you find yourself without money, or
        drudging for others, it is because you have not been generous
        enough in your desires for the good of others or have failed to
        serve when called upon, in seeking opportunity wear becoming
        shades of orange, henna, scarlet, or heliotrope. `
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
        bask in the calm and certainty of your life. The affairs of your
        business, and even of marriage, may go to pieces, if you live
        too intensely in emotion and sentiment. Remember, you are
        the educator and you cannot take the easy pathway. It is
        through knowledge, science, skill, and wisdom that you take
        your place in the world. You may be out of the common class,
        but you will be loved and respected for what you have attained
        and know. \n\n
        There will be times when you will need to broaden your
        opportunities. Travel, go into out-of-the-way places. Mix with
        people who are the thinkers of the world, such as scientists,
        investigators, historians, inventors, chemists, technicians, and
        those who are mathematically and analytically inclined. Writers,
        radio artists and technicians, lawyers, surgeons, and those
        who have specialized in work give you interest and can help
        you. Study religion and the sciences of being. Do research
        work as a hobby. Criminology, secret service, and the more
        subtle lines of endeavor will broaden your mind and help you
        understand life. The realm of scientific art should interest you
        and you could become the connoisseur os art, literature, and
        antiques. Invite to your home those who have brains. Make
        your home high-class and selective, but warm and helpful to all
        who seek knowledge and earnestly try to bring science ano occult
        principles of knowledge to bear upon human experience.`
      },
      {
        "description": "The Dynamo",
        "detail": `You have a dynamic Destiny, giving you the right to position,
        authority, money, and recognition in the world. Your
        pathway will not be an easy one and your success will come
        through “knowledge of life and its spiritual relationships,” as
        well as through financial effort and determination. Your reward
        will not always be in money, but in accomplishment; you
        must work for the love of doing things and find more satisfaction
        in the good work than in personal reward. To make
        money your chief ambition could mean to court failure and
        downfall from which it would be hard to recover. Money will
        come when you have learned to strike a balance between the
        material and spiritual forces of being and to work for the good
        of all concerned, rather than for yourself alone. You may be
        compelled to repeat your efforts again and again to reach your
        goal, but only until you fully realize that all attainment is
        based on the law of cause and effect, and not on chance or
        luck. Your lasting reward will come through your own efforts,
        strength of character, and mastery over self. Do not waste your
        energies struggling for wealth. Do something wortnwhile, regardless
        of financial return. Train your mind to philosophical
        thought and always try to be an unprejudiced judge of the affairs
        of others. Manage and direct your activities with efficiency
        and meet emergencies with courage, and you will be
        pleased to discover that you are an outstanding and successful
        character in the community before you leave this old world of
        ours. \n\n
        When seeking to enlarge your field of opportunity, join
        with people who are interested in civic affairs and the government.
        People who travel and get into out-of-way places should
        stimulate your mind. Writers, literary people, printers and
        publishers, correspondents should be your friends, and you
        may discover you can write too, if you want to. Take an interest
        in sports, games, and the general amusements of tie public.
        Philosophical, mystical, and religious lines of thought should
        be studied for your mental growth. Big business men, who deal
        with large undertakings and control the affairs of the business
        world, should be among your friends and can help you develop
        your own talents 'or coaching, educating, and directing the affairs
        of mankind. Wear becoming shades of opal, canary, tan,
        or ivory, when seeking new opportunity. `
      },
      {
        "description": "The Beautifier",
        "detail": `You came into the world to stand for all that is fine,
        philanthropic, charitable, and beautiful. Music, art, romance,
        drama, color, ideality, and perfection should be the standards
        of your life, and even the most ordinary undertaking must be
        changed from the commonplace into the lovely, by your presence,
        thought, and ways of doing things. Your opportunities in
        life are so many, so all-embracing, and life will give you so
        many gifts, that in order to keep them for yourself, you must
        represent all that is fine, true and generous to the world. Love,
        tolerance, compassion, understanding, and generosity are the
        keynotes to your success and happiness. You may meet many
        experiences and tests; might even seem to fail, until you learn
        to express forgiveness for one and all. All that you desire in
        love and companionship will come to you when you learn that
        true love is service to the many rather than to the one. To cling
        to personal love, possessions, and power too tenaciously might
        be to lose all; but when you express love as a Divine Law, you
        will then receive greater love than you have ever dreamed of.
        There is a tremendous power wrapped up in your nature which
        you can turn on to warm the hearts of humanity and to awaken
        them to beauty, when you live true to your Destiny of love, service,
        and the brotherhood of man. Dramatize life—not the sorrowful,
        but the beautiful. This will put you in command of the
        best the world has to offer.\n\n
        There will be times when you will need to increase your
        opportunities and to reach out into broader fields of endeavor.
        There is no real limitation o place or opportunity for you
        unless you make it so by careless living. People in all walks of
        life will help you and you can help them when you train your
        mind to universal thought. Physicians, lawyers, writers, artists,
        painters, orators, ambassadors and religionists should
        be among your friends; even those in the lower walks of life
        should know your generosity. Men and women in all walks of
        life will help and admire you as you give the dynamic force of
        your being to constructive opportunity. Do not allow popularity
        to go to your head at any time. Always be impersonal, for
        habit, weakness of purpose, or a too wor thy life could cause
        you to miss the thrill of taking a hand in molding the hearts
        and minds of humanity. Make the expression of your personality
        colorful. Do not be drab or colorless in your dress or
        environment. `
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
        ideas. You are, or should be, selective in friendships, and
        have quite a sense of humor. You love the nice things of life
        and are sensitive to your environment and to what others think
        of you. Life should never be dull for you if you make the best
        of your initiative, executive ability and original ideas, for you
        have strong powers of attraction wnich will lead you into interesting
        work and experiences. Broad vision, magnetic force, and
        inspiration enable you to carry out your plans in a big way and
        for financial reward.
        The negative side of your character is shown in the following
        ways, and you should keep this side under control; use
        your strong will and determination to avoid intensifying these
        qualities or allowing them to become “set” or “fixed” habits:
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
        and all types of business which are outside the established order of
        things.
        Wear flame, lilac, copper, or apricot for a touch of color
        while you work. `
      },
      {
        "description": "Diplomatic Type",
        "detail": `You are the diplomatic type, naturally sensitive,
        cooperative and considerate of others. There is a gentle side to your
        character and it is this which makes you more persuasive than
        forceful. You are a good mixer, able to influence others and to
        win them over to your way of thinking, especially when you
        realize the power there is in your quiet way. Your success depends
        very much on your ability to help others get what they
        want, rather than to be too selfish or self-interested. This is due
        to a spiritual quality in your make-up and you should not fail
        to value this even in business, for it is your peacemaking qualities
        rather than your attempts to dominate which win for you.
        Your natural sensitiveness when rightly directed becomes sincerity,
        graciousness, and esthetic feeling, and you should try to live
        according to high standards of culture and refinement. Your
        sympathetic feeling and consideration of others, ability to analyze,
        to be accurate and detailed, are fine business assets. An
        ability to associate with others, bringing people together for a
        common cause, is an attractive part of your nature.
        There are a few faults in your make-up too. Sensitiveness
        could become a fault, making you negative, fearful, timid, and
        fretful, instead of strong and courageous even in a quiet way.
        Now and then you are uncertain, finding it hard to decide what
        to do for fear of being w r rong, for you are naturally conscientious
        and want to do the right thing. Your accuracy makes you
        dislike mistakes, and you often hesitate for fear you may not
        do as well as you would like to. You should overcome this. Do
        the best you can at all times and gradually you will perfect your
        talents and make a success in the world. Even though you are
        courteous and kind, you can be surprisingly blunt in speech
        and exacting in your demands, expressing a great deal of nervous
        energy. You are something of the extremist too, strong in
        your likes and dislikes, and there is a touch of the reformer in
        your character. If you will cultivate the people who stand for
        the best in life, share what you have with others and then make
        use of your talent for doing things well, you will climb the ladder
        and stay at the top.
        Opportunity comes through fine machinery and delicate
        instruments. Success may come through dancing, music, painting,
        literature, violin, harp, and other finer musical instruments.
        The ministry, religious activities, medicine, politics, and
        ail lines of administration are open to you; also banking, as
        treasurer, teller, paymaster, accountant; and activities dealing
        with finance and money; radio, electricity, sending of messages,
        technical and mechanical pursuits; gathering o statistics,
        collecting art works, tapestries, papers, pieces of money;
        success through endeavor having to do with travel, liquids, and
        the moving public. Wear gold, salmon, garnet, or cinnamon
        while you work. `
      },
      {
        "description": "Creative Type",
        "detail": `You are the creative type, possessing a good imagination,
        power of inspiration, and deep emotional feeling. No matter
        how practical you may think you are, or try to be, you will find
        much of your success dependent upon the “vision” and creative
        imagination you add to your undertakings. You have the
        gift of words as a natural asset and this ability to express yourself
        in words, the gift of “gab,” is a financial possibility. Socially,
        your ability to talk, entertain, and inspire others is the
        open door to friendship and social standing. However, you
        can talk too much and at the wrong time when you allow your
        emotions to get the best of you, so keep a guard on your speech
        and make it a vocation, not a scattering force. Your natural
        tendency to be obliging, to help those who are weak, and a
        cheerful, happy disposition are financial assets. You are capable
        of reaching great heights of attainment, even performing
        deeds of valor, when you live up to that inner feeling of power
        which comes to you at times. You like to do things on a large
        scale and have the intuition, or “hunch,” which tells you what
        to do. This will always help you, but there may be times when
        you become too optimistic, scattering your forces and your
        money, thus failing when you should succeed. You should try
        to understand your own ambitions and carry them out, but
        avoid going too far or letting emotion get the best of you.
        There is a reticent side to your character too, for you are
        very sensitive and can withdraw into a shell of silence when you
        are criticized or hurt. Now and then, too, you can be very critical
        of others and tell them of their mistakes or unconsciously
        become selfish and sel -centered, causing problems in your
        love affairs. At other times you can be easygoing, seeming to
        lack in will, or to be too fond of ease and luxury. But you have
        the ability to supply yourself with the best there is in life when
        you use your creative powers successfully and can change your
        luck any time you put your imagination to work. You can be a
        very pleasing companion, admired by the opposite sex, and you
        are capable o enjoying life. You have splendid powers of attraction
        and if you are not getting the best out of life, it is your
        own fault, for you are unusually endowed with talent.
        You may succeed in all artistic lines, both in business and
        in the professions, art stores, clothing, millinery, department
        stores, jewelry, candy, foods; all lines of entertainment, dancing,
        music, writing, and acting; stocks and bonds, printing,
        publishing, libraries, designing, illustration, drama, religious
        activities, and psychic pursuits; success in all lines of activity
        where feeling and emotion have financial value, and in making
        dreams come true.
        Wear ruby, gold, amber, or russet while you work. `
      },
      {
        "description": "Practical Type",
        "detail": `You are a practical type. You like to know just what you
        are doing and why, and do not take a chance unless you are
        sure. You are rather serious and quite fixed in your way, but
        are naturally honest, sincere and conscientious. You have a
        strong sense of what is right, and even though you are strong in
        your likes and dislikes, you have a natural friendliness, combined
        with a sense of dignity and self-importance. You like to
        feel sure, to have a nest egg, and have a very good sense of
        practical values which, if you cultivate it, will help you in the
        business world. You like to have a plan and are patient about
        the details when you can take time to work them out accurately
        and carefully. There is a fine ability too, in your make-up, to
        manage, systematize, and to establish order and routine. You
        like to have things done well and can be exacting about the details
        of personal items, sometimes neglecting the bigger things
        for the smaller details, even in business.
        You are approachable in personality and in business are
        capable of helping everyone. At the same time you are rather
        selective in your personal friendships and associations. You are
        naturally careful with your possessions, competent, and a good
        manager, and have the ability to inspire confidence, for you
        are noi easily carried away by fancies or fads and extravagant
        undertakings. You like the best in life, and are a good spender,
        but you can be very careful about money and demand return
        for value given. You are capable o working hard and show tenacity
        and perseverance when your mind is made up; and a few
        hard knocks are good for you as they bring out your natural
        courage, powers of concentration, honesty, and your good nature.
        You seem to do better when you have a hard problem
        than when things are too easy. Now and then you can be a little
        exacting, even a little bossy and dominant, and like to give
        orders rather than take them; and you may argue or be a little
        bit contrary when you do not have your own way; so watch out
        for this as it can make difficulties for you. But value your fine
        powers o management and of constructive endeavor, and
        these will take you far in the business world.
        Number Four may find success through building, contracting,
        organization, and bringing plans into concrete form;
        success through buying and selling, administration, soliciting,
        hiring, employment, regulation of ceremonies, and management
        of well established business; success through scientific interests,
        educational matters, promoting campaigns, and in all
        lines of endeavor having to do with documents, papers, contracts,
        examination, legal activities, lending or exchange, and
        concerning property and real estate; store keeper, dealing with
        commodities, repairing, and supplying the public with its daily
        needs in practical necessities. Number Four is not good in “get
        rich quick” schemes, but in work that has background.`
      },
      {
        "description": "Independent Type",
        "detail": `You are the independent type. You like your freedom and
        have a natural interest in what is going on in the world and are
        at your best when you can have more than one iron in the fire.
        You are an active individual, sometimes restless and impatient
        if things move along too slowly, or you have to do the same
        thing over and over too long at a time. You are versatile and
        clever, having natural resourcefulness and so much enthusiasm,
        that things do not stay the same for long where you are.
        You can keep things moving and are a rapid, quick thinker,
        charged with imagination and gift of words; you add pep and
        speed to whatever you undertake. This is one of your attributes
        of business success. Sometimes an inner restlessness causes you
        to act hastily and to burn your bridges behind you when you
        should have left them standing to cross over again. You can
        become discontented easily and change too readily for your
        own good when you allow the love of freedom and change to
        become too strong. You should seek the opportunity to travel,
        see the world, and to know life; but you should not be the rolling
        stone which gathers no moss.
        You may be accused of lacking in application, because
        you like change and variety, it is true you do not like to spend
        unnecessary time getting things done, but your versatility and
        quick thinking give you power and authority in all progressive
        activities and lines of business. You can be bold and invincible
        when aroused to action and will challenge any obstacles in your
        way.
        You can be very analytical too, sometimes unsympathetic,
        and like to stir things up when expressing the negative side of
        your character; but the better side ol your nature is charitable
        and helpful. Even though you are freedom-loving, you like to
        see the “law” ful illed and do not lack stability. Without you
        the world could grow dull and get too fixed in its way for real
        progress. Many experiences will come to you in life. Extract
        the value from them and build your success upon the knowledge
        you have gained from much living and contact with all
        kinds of people.
        The number Five may have opportunity through dealing
        with the public and its love of change and variety; opportunity
        through business which caters to the public’s desire for life,
        travel and excitement; advertising, publicity, selling, newspapers,
        business of exchange, investment, and promotion, and all
        lines of work which call for energizing power rather than routine;
        legal matters, civil service, drawing up of contracts, transfers,
        distribution of material, law, politics, column and story
        writing, and the field of amusement; opportunity through mysteries,
        the occult and the unusual, scientific study and analysis.
        Wear claret, wisteria, or strawberry while working.`
      },
      {
        "description": "Humanitarian Type",
        "detail": `You are the humanitarian type and are capable of serving
        mankind and of doing worthwhile things in life. You are an
        idealist too, and have many strong opinions about what is right
        and wrong and cling tenaciously to your ideals of truth and
        justice. You are generous, kind, and sympathetic and have a
        loving, appreciative nature; much of your success in life, both
        in business and marriage, will come through the kindly, helpful,
        and protective things you do for others. Responsibility is
        the keynote to your activities, for your ability to do things in a
        big way and a natural tendency to serve and teach will keep
        you busy and help you attract money, love and admiration.
        Many will impose upon your good nature and take advantage
        of your generosity, even your family and loved ones; but as
        long as you do not become personal and resentful, but keep on
        serving humanity, you will always have money and opportunity
        in the world. Sometimes you give too much and sacrifice
        yoursel for others, going to extremes because you love to help;
        and this must be guarded against, for it may cause unnecessary
        loss and emotional unhappiness. You are fond of your home,
        family, and relatives, have an artistic nature, love beauty, harmony,
        flowers, music, and the luxuries and comforts of life.
        You should establish an artistic and harmonious environment.
        You need the same love and sympathy for your best
        growth which you give to others, and a chance to live an
        idealistic life. You are more controlled by your feelings than
        you care to acknowledge, so when you are not happy or appreciated
        you can become surprisingly stubborn, unreasonable,
        and unhappy and feel like giving everything up. And too, you
        can become dominant, exacting, and fussy. Don’t be like that.
        You are too ine a character. Keep on giving and helping others,
        but sensibly, for after all, you are the one who serves, comforts,
        and teaches the race.
        Business opportunity and luck come through lines of endeavor
        which serve humanity and make life more comfortable,
        easy, and luxurious. Doctor, nurse, teacher, rancher, cook,
        minister, welfare worker, restaurants, furniture stores, schools,
        select apartment houses, family hotels, and all commercial and
        industrial pursuits which combine art, comfort, and beauty,
        are in your life scope; ine opportunity through teaching and
        training children; animals and flowers give financial attraction;
        also interior decorating, gardens, pottery, and commercial art;
        possibilities as singer, story teller, and painter; boats, irrigation,
        ships, engineering, mines, horticulture, livestock; religious
        activities and all lines of reform and education. Should you find
        yourself drudging and lacking money you are wrong somewhere,
        or have forgotten to be generous, for you belong to
        those who should make money and have the comforts of life.
        Wear orange, henna, scarlet, or heliotrope while you work. `
      },
      {
        "description": "Scientific Type",
        "detail": `You are the scientific and thinking type. You have an
        observing nature and an analytical mind. It is not natural for you
        to accept things at their face value for you have a natural ability
        to relate facts, put two and two together, to size up situations
        and conditions from a technical and scientific standpoint.
        This is part of your financial success and gives you unusual
        opportunity if you use it well. You have a high type of mind,
        combined with an intuitive feeling and an ability to understand
        the hidden and non-apparent facts, making you a developer,
        discoverer, inventor, and specialist. Knowledge is power in your
        life, and the more you know, the farther you will go.
        You are naturally reserved, thoughtful, silent, and selective,
        and while you like people and like to be with them, you
        do not care for the common crowd and select your friends and
        environment with respect for dignity and pride. However,
        when you are on your own ground and feel familiar and at
        home, you can talk well and interestingly. You have an inner
        magnetism which is an inspiration to others and a drawing
        card, both in business and friendship.
        You are not a truly adaptable person and are averse to
        being asked questions outright, although you ask many and
        demand proof, making you seem to be a doubter, or cold and
        hard. This side of your character can make you difficult to
        understand and you may hardly understand yourself at times, but
        when you take time to listen to your inner guidance, you have
        nothing to 'ear at any time. You often need to be a'one, to get
        close to nature, to think and read, for you gain your composure
        in this way and discover your true self, which makes you a
        most attractive and successful character. You are something of
        the stoic too, for too much emotion strips you of your power.
        Many times during your lifetime you will have to depend entirely
        upon your own ability and soul force; but just have confidence
        in your inner magnetism, your clear thinking mind,
        your technical and mathematical ability, and you will be called
        from the background into the luck you deserve.
        All lines of business which call for calculation, analysis,
        'ine deduction, scientific knowledge and technical ability;
        insurance, mathematical pursuits, chemistry, dietetics, history,
        research, criminal investigation and all business requiring skill
        and specialized ability; educational matters, technical and
        scientific art, medicine, law, engineering, invention, literary
        activities, laboratory and statistical interests, radio and cinema—are
        in your scope. The occult, mystical, and mysterious give
        opportunity; also music, pipe organs, and musical instruments;
        ability to do fine work with your hands, carving, etchings, and
        making of delicate objects of art and science; bookkeeping and
        accounting.
        Wear purple, brick, or pearl while working. `
      },
      {
        "description": "Executive Type",
        "detail": `You are the executive type and have splendid powers of
        organization, placing you among those who organize, coach,
        supervise, direct, and govern affairs, at home and out in the
        world. You are capable of taking charge of things and are ambitious,
        energetic, efficient, and capable of judging people and
        situations with a air mind. These talents should give you authority,
        recognition, position and power in the social, professional
        and business world. You have a natural ability to judge
        character, a philosophical turn of mind, and wonderful powers
        of self-control; you have the courage and energy to repeat your
        e: forts until you reach your goal. You should be at the head of
        large undertakings and business and professional activities, for
        a small, narrow, routine life does not bring out your strength
        and efficiency. In fact, an emergency or need does much to
        bring out your real character and force of initiative. Your success
        in life comes from working for a goal or purpose through
        organizing work, endeavor, and plans helpful to many people.
        You are not exactly the humanitarian, but you do have the
        ability to inspire others to greater effort and to do things for
        yourself and the world in a spectacular and valuable manner.
        There is a very fine side to your character, capable of mastering
        the hardest problems, through a faith in spiritual and
        philosophical law. Another side is often commercial, material
        in thought and interested only in financial gain. Your best success
        comes, however, as you strike a balance between these
        two, to give you the wise judgment which Life demands of
        you. Sometimes you strain, strive, think too much of money,
        and use so much energy doing things that you wear yourself
        out, driving love and business away instead of attracting them.
        Don’t strive so hard. Just make sure your judgment is good
        and take time to do things well; then your natural executive
        ability will take you to the top. This judgment is the keynote to
        your position and authority and should place you at the head
        of business and broad professional enterprise.
        The Eight finds success along any line of work demanding
        organization; opportunity through printing, publishing,
        correspondence, editing, exploring, civil government, supervising,
        coaching and regulating general business and finance; real
        estate, property, selling, exchange, games, sports, athletic
        activities, archaeology, drama, music, pipe organ, intelligence
        service, nurse, care of mental hospitals and institutions—for
        your abilities cover a wide scope; character analyst, judge,
        lawyer, historian, writer, and good in all lines of governmental
        activity, statistical and research departments, efficiency expert.
        Wear opal, canary, or tan while you work. `
      },
      {
        "description": "Philanthropic Type",
        "detail": `You are the philanthropic type. You have a deep feeling
        for mankind, sensing the heights and depths of life and the
        glory of existence. You are not always able to live in this high
        state of consciousness, but you do color your affairs with dramatic
        feeling. Your disposition is compassionate, generous,
        sympathetic, and tolerant, and you have a wide range of feeling,
        a sensitive nature, and a very vivid imagination. When you
        express your natural compassion you are capable of doing
        interesting and lasting work in the world, including art,
        philanthropy, religion, and business. You are impressionable and
        broadminded and eager to take on the responsibilities of life
        but sometimes meet disappointment because you do not find
        the perfection you seek in others or in yourself. You must rise
        above these disappointments and keep your generosity of purpose;
        and try to realize that perfection must be earned and
        cannot be reached all at once. Help others, counsel them and
        inspire them; but don’t give to the point of weakness, for this
        only delays you and keeps you from doing the universal work
        which your talents permit.
        You are idealistic, romantic, have a striking personal magnetism
        and a marvelous power to influence others for good or
        bad. You love deeply and passionately, and true love will
        remain with you always as you are more broadminded, tolerant,
        and compassionate than the ones you love. With all your beauty
        of character at times you can be strangely uncertain, timid,
        vacillating, even moody, and show weakness of character, because
        you cannot reach your ideal or attain the perfection you so
        deeply realize. But don’t be that way. You have such marvelous
        power to turn the unlovely into the attractive, the worthless
        into the beautiful, to rebuild humanity and to promote
        civilization, that if you follow this goal, your success will be
        beyond your expectations.
        Opportunity comes to the Nine along all dramatic, artistic
        and emotional lines of business; stage, literature, movies,
        education; dealing with foods, health matters, and lines of business
        which have to do with the broader phases of living; through
        travel, foreign people, or governmental activities and business
        dealing with and including many people; in ability to employ,
        place, train people and place them for success; in ability to
        beautify land, homes, property, and environment; as lawyer,
        teacher, physician; through mechanical arts and through use of
        knowledge of color, painting, designing. Religious and charitable
        activities give financial gain.
        Wear much color while at work, especially pastel shades. `
      },
    ]

    return values[number - 1];
  };

  getHeartsDesireDescription = (number) => {
    const values = [
      {
        "description": "Independence",
        "detail": `You are an independent character at heart, strongly
        individualized and courageous. You are ambitious too, and want
        to get on in the world, but by your own efforts and intelligence.
        You are not one to shirk your responsibilities, for you
        have much inner strength and determination, but you do like
        to feel independent and do things in your own way. You could
        never really be happy in a subordinate position. In fact, your
        ability would not allow you to remain there long, for there is
        too much inner power, determination, creative force and executive
        ability down deep in your heart to allow you to stay at
        the foot of the ladder of life. Should you find vourself remaining
        in such a position for some time, it would mean that you
        were not digging deep enough into your heart for the strength
        of character which is there. You have latent powers of executive
        ability, interesting and original ideas, and if you make use
        of them in a constructive manner, you will find you are making
        your way in the world with ease and satisfaction. The fulfillment
        of your Destiny depends a great deal upon the cultivation
        of this inner force of character and the innate strength and
        independence of your ambitions. But remember that in order to
        be the true leader, you must help others too and not think only
        of your own interests and desires. When you do this you will
        'ind others respecting and helping you; life will never hold a
        dull moment, but will open the way for outstanding position
        and opportunity.
        There are possibilities of faults growing out of your inner
        will and determination. Now and then you can be headstrong,
        impulsive, willful; you do not like to be told to do things or to
        be bossed by those who are not in sympathy with your ideals or
        methods. This might make you appear contrary, or bossy,
        dominating and egotistical. This could lead to misunderstandings,
        unhappiness and quarrels at certain times in your life.
        You are not lacking in cooperation; in fact you often shrink
        from taking a stand or from doing the thing which will place
        you at the head of things, for fear of hurting others. You are
        reticent too and sometimes lack in seif-confidence, except that
        something deep in your heart urges you forward. Stand for
        your rights, keep your seif-confidence strong, be yourself, and
        maintain your pride in yourself and your accomplishments.
        But at the same time always express your ideas and plans with
        courtesy, graciousness, and sincerity, and then you will be a
        well-loved leader and character. At home, as well as out in the
        world, you feel your right to be recognized, or at the head of
        things; and you always will be as long as your nature is kind
        and generous.
        So you see, there is much that is interesting in your
        makeup; your pride, your sensitiveness, your moments of willfulness,
        impulse, and determination, combined with sudden
        reticence, shrinking, dependence, and wit are the things the one
        who ioves you will see in you and admire. They are the lovely
        things about you and you should always keep them so.
        Wear flame, copper, apricot, lilac, or shades oi these colors when attracting
        love and friendship. `
      },
      {
        "description": "Harmony",
        "detail": `Deep in your heart there is sincerity, graciousness and
        consideration for others. You have an appreciation of the refinements
        of life, and when you are true to your inner nature you
        will express these qualities. Peace and harmony mean much to
        you and influence your actions in everything you do—business,
        studies and love affairs. You desire to obtain results harmoniously if
        possible; but you will fight if driven too far, although
        your tendency is toward persuasiveness rather than aggressiveness.
        Your almost unconscious urge for harmony may at times
        make you appear shrinking and even negative when you are
        really only trying to cooperate with others, or to avoid strife
        and disagreements. You do things for the sake o “peace”
        when you should not, and your gentleness and tendency to act
        in a non-resistant manner often make it difficult for you to
        stand up against a more willful or dominant person.

        You are cooperative in your thoughts and actions; you
        love to share with others and to help those who are in need.
        You depend upon others too, even more than you care to admit,
        and you often fear to trust your own judgment. Consequently
        you often suffer periods of doubt and uncertainty, and
        sometimes are forced to subordinate yourself when you should
        be sharing equally with others. You have a natural dread of
        offending, but you should try to overcome this tendency to inner
        self-consciousness. It will make you unhappy and cause
        you to miss opportunities to use your talents and to carry out
        your Heart’s Desire. Your gentle, sweet inner nature is your
        charm; quiet assurance, impersonal attitude, general friendliness,
        are your greatest assets; and if you will try to emphasize
        these traits, they will make you popular and help you win what
        you cannot force in life. Your sympathy and feeling for others
        make you appealing and attractive to the opposite sex, but it
        may result in many disappointments and problems until you
        learn to be self-determined and stand up or your own rights.

        There is a spiritual quality in your make-up of which you
        may be unaware. From this quality springs your sensitiveness,
        love of beauty and culture as well as your gift of analysis and
        ability to understand the finer things of life. It causes you to
        shrink from everything coarse, crude and unlovely, but when
        you learn how to use this spiritual force, it will become a
        dynamic power, a magic key, enabling you to control and direct
        your affairs far more successfully than any material knowledge
        can give you. At times you may be indecisive and have difficulty
        in making up your mind. When you find yourself in this
        state, “snap out of it,” and have more confidence in yourself.
        Forget your fears and worries and what others may think or
        say. Go after things in your own way, even though it may not
        be a forceful one. Appreciate the sincerity and cooperation in
        your nature. Transmute sensitiveness into artistic feeling and
        the refinements of life. Then you will be able to overcome the
        obstacles and problems of everyday life and get more “kick”
        out of existence. Your ability to “mix” should assist you in the
        business world, increase your Vocational assets and aid you in
        fulfilling your Destiny. Gentleness need not be vacillation or
        insincerity. Be true to your higher resolves. Share your success
        with others and you will find life very worthwhile.

        People having the number Two at heart will be helpful
        and companionable. To attract sympathetic friends wear gold,
        salmon, garnet, cinnamon as part of your accessories.`
      },
      {
        "description": "Joy",
        "detail": `You are something of a dreamer at heart. You would
        rather be happy than practical and have a strong desire to find
        the joy and romance in living. In fact, inspiration and imagination
        are your finest characteristics and when you learn how to
        use them intelligently they will be the means of your attaining
        the best that life has to offer. You love to do things grandly
        and on a large scale and like nice environment, protection, the
        comforts of life, and the elegance of living. But to what extent
        you realize these desires depends somewhat upon your Destiny
        and vocational talents. Should your artistic instinct and desire
        for self-expression in some happy, even fanciful, way be
        thwarted, you could become repressed, even unhappy or ill.

        You love to talk and to express your opinions and ideas
        when you are with those you love and you will generally find
        yourself the center of activities because of your ability to liven
        things by your pleasant, friendly manner. You should specialize
        in making others happy. It is also true that there is a reticent
        side to your nature and you can shrink from the limelight
        and from becoming too conspicuous; and there is a tendency in
        your inner self to live in a world of feeling and emotion. You
        should try to express this emotion in some constructive manner
        —follow the dictates of your heart to create—and you will be
        easily successful in the world of finance and professional life.
        Sometimes you fret about small things and are inclined to be
        too exacting if things do not come up to the standard of perfection
        and loveliness you desire. You will do better in life if you
        follow your desire to do things on a large scale and do not try
        to hold yourself down to a limited scope o; activity. Stick to
        your dreams and make them come true, but don’t dream too
        much and fail to get down to earth.

        Your natural urge is to be kind and obliging; you love to
        help those who are in trouble. You have a keen appreciation of
        friendship and your friends mean a great deal to you. You are
        capable of a deep love and of sacrificing yourself for those you
        love; and you want to have love and be loved. You see, you are
        a bit romantic at heart, as well as artistic and inspirational.
        You should be admired by both sexes when you remember to
        be reasonable in your demands and opinions; you can be a
        most entertaining and charming companion. You have so
        much ability to make others happy that you should never be
        alone or without love. Should you find yourself without admiration,
        it might be because you had unconsciously become self
        centered or self-satisfied and so interested in your own affairs
        and activities that you had forgotten to think about the affairs
        of others; this could hurt those who love you and who are trying
        to help you. Now and then you talk too much and like to
        show off a little, but as long as you keep cheer, good will, and
        beauty in your heart, you will find no difficulty in carrying out
        your Destiny and working out your problems.

        To win friends wear rose, ruby, amber, and gold as part
        of your accessories.`
      },
      {
        "description": "Order",
        "detail": `You have a fine appreciation of law and order in your inner
        nature. When successfully used, this quality will be of
        value to you in the world of material success. You have a
        practical point of view and like to have affairs arranged
        with system and dispatch. You look at life in a wholesome way and
        you are very conscientious in your undertakings. You want
        things to be correct and “like they should be” and generally
        meet your problems seriously, in a matter-of-fact way. You
        like to look ahead, to plan carefully, and to apply yourself to
        your tasks with concentration and good management. Your
        Destiny and your Birth numbers may not give you the full
        opportunity to express this desire at all times, but you are happier
        when you can plan and lay a foundation of a permanent nature
        upon which to build your life. You can be very restless,
        unhappy, and inwardly disturbed when life is uncertain
        and lacking in security or when you have nothing to hold to, or for
        which to work.

        In business, home, and love affairs, you are rather serious
        in thought and action. Your business or marriage partner
        should have a practical outlook too, because you want dreams
        to come true and desire real and tangible results. Loyalty,
        stability, dependability, mean much to you. You have many
        convictions and do not easily change your mind once it is made up.
        You are honest and sincere in your motives and have a fine
        inner determination. You can stick to things with tenacity and
        patience when you receive the right encouragement. Your ability
        to apply yoursel: to get things done enables you to overcome
        difficulties and to get definite results. Now and then you
        give too much time to details, for you like to have everything
        exact, correct, and just right. You may worry and fret if little
        things are not attended to. This conscientiousness is one of
        your good traits but if carried to extremes might be the cause
        of your missing some of life’s larger opportunities. Greater
        happiness will come when you learn not to allow little things to
        count too much.

        If I were to pick out a fault in your character, it would be
        an unconscious tendency on your part to take the opposite side
        oi matters at the first approach. This is due to your desire to be
        right, to understand things, and to be sure. You may even argue
        and be hard to convince until you are sure. Friends and
        associates may accuse you of contrariness and slowness, but you
        really are not contrary. It is your inability to change your mind
        easily which makes you appear so. Plan your life according to
        your practical desires, but also put fun and inspiration into
        your undertakings, especially love affairs, so that you will find
        life more interesting. You should always follow your inclination
        to build and construct on all planes of life. Your soul urge
        is for constructive accomplishment which you can use to help
        humanity in many practical ways and also to make a success of
        your own life. Build your character and your life brick by brick
        and do not hurry. Take time to do things well and you will find
        your life built upon a rock of security, with success never failing you.

        Wear blue, green, emerald, coffee, maroon, or silver in
        your accessories to attract friends. `
      },
      {
        "description": "Excitement",
        "detail": `You are interested in what is going on in the world and
        desire to be a part of it in some way. You are enthusiastic, enjoy
        life, the new, the progressive, the unusual, and seek the
        opportunity to express yourself through groups or public activity.
        The unexpected and exciting are more stimulating to you than
        the ordinary procedures o everyday existence. Independent in
        thought and action, you definitely claim the right to personal
        freedom; you do not permit people or conditions to inter 'ere
        with your life or to limit your self-expression or any length of
        time. You are charitable and considerate of others, but at the
        same time you insist upon the right to follow your own ideals,
        and to live your own life.

        Routine can easily become a bore to you regardless of
        your work or activities. You are not at your best when forced
        to do work or remain in a place which is always the same. Your
        attention may wander if there is not sometning new, different,
        or just a little bit exciting taking place to give variety and spice
        to life. Your Destiny or Vocational numbers may not allow
        you all the freedom you desire, but you will be able to express
        yourself better in a general way if you can change things from
        time to time to liven them up. Lack of freedom and variety
        may lead to a feeling of dullness, discontent, unrest, and
        dissatisfaction, causing you to act hastily and impulsively, and to
        do things which may lead to sorrow or regret later for others as
        well as yourself. I you will learn to recognize this unrest and
        turn it into worthwhile action and resourcefulness instead of
        impatience, you will develop an amazing power to accomplish
        things, influence people, and “go places” in the social,
        financial, and progressive world.

        You are ambitious too, but you should avoid too many
        irons in the fire, scattering your forces and finances and
        undertaking more than you can successfully carry out. Too much
        change and variety may result in lack of proper application and
        concentration to the tasks at hand, so that you fail to
        accomplish anything. Watch out for this tendency. Be alive
        and active but in a very definite and useful manner. Your Destiny will
        help you decide how. There is a little of the “Bohemian” in
        your nature and you may become somewhat of a free lance in
        your religion, politics, or social life as you grow older and
        make up your mind in your independent way. Even in love
        affairs you are likely to keep things interesting or introduce the
        unexpected. Travel is good for you. When you feel yourselt
        getting restless and critical or irritable, buy something new,
        take a trip, or make some constructive change which will
        improve your work and environment. Don’t tear things down or
        criticize others. Your own restlessness and impatience may be
        at fault. Refuse to take from others more than is your due or
        than you can return. Claim your freedom but realize that
        freedom does not mean breaking the standards of living or being
        unconventional. It simply means living a fuller, richer life and
        helping others to do the same. Value your resourcefulness;
        make it pay you well and use it to bring joy to those you love.
        Keep in touch with what is going on in the world. You need to
        keep up-to-date.

        Wear pink, strawberry, claret, wisteria, or cherry as part
        of your accessories to attract friends.`
      },
      {
        "description": "Service",
        "detail": `Deep down in your heart there is a fine sense of loyalty
        and a real desire to do good in the world. You are deeply
        sympathetic and sense the needs of humanity. You will always be
        somewhat of an idealist and much of your success, as well as
        many of your disappointments, will be the result of this quality.
        You are faithful to those you love, clinging to family standards
        and tradition, even to the point of sacrificing yourself
        for love, family, or some ideal of service. You are firm in your
        ideas of right and wrong, developing these convictions more
        positively the older you grow. You are apt to be frank, even
        bluntly outspoken when your sense 01 fairness and justice have
        been violated, but you will fight just as hard for others as for
        yourself. Your soul longs for beauty, harmony, and companionship,
        and when you follow your soul urge you are capable
        of living on a very high plane and inspiring others to do
        likewise. You should never permit life or experience to rob you of
        your ideals. Part of your work in the world is to help others,
        especially the young, to maintain ideals of love, beauty, and
        justice, and your whole life could be defeated if you allowed
        anything to darken your faith.
        You are capable of a deep and lasting affection 'or those
        you love; but you want to be loved in return and you are not
        happy unless you have the full measure o> love and appreciation
        which you believe is your due. At times you are overgenerous
        and indulgent to the extent that you give more than you
        should, more than is good for the other fellow. Many of your
        troubles result from this. You may even blind yourself to the
        faults ot family, children, or riends, and then suffer when you
        find they are only human after all. Still, this very quality is part
        of your charm and is the reason why others love you. Keep a
        check on your kindness and do not give too much to one or
        two. It may not be right and end in unhappy experiences or
        ack of appreciation. Give some of your love to humanity and
        work for the good of the world as well as for those you
        personally love. A home and marriage mean a great deal to you
        and you will make every effort to establish yourself securely in
        a home and maintain your own comfortable place. Still you are
        capable of renouncing love for service, because your ideals are
        so high. You belong to those who beautify life, and your
        environment should be both artistic and beautiful. You should
        also surround yourself with friends who are making the world
        a better place to live in. Children, animals and those who are
        helpless appeal to you, and you will be loved by them.

        Now and then you can be just a little stubborn about what
        you want and so determined to carry out your own ideas and
        plans that you forget to consider the viewpoint of others. Not
        that you mean to be stubborn, but you sometimes insist that
        others shall do what you think best because you believe your
        way is best. Your desire to help can be so strong that you
        almost smother those you love, who, in turn, are forced to free
        themselves to find their own good. Try to understand life a
        little more and realize that people differ in opinions. Learn
        to assist them to do what they want to do, not just what you think
        they should do; the more you do for others in a loving way the
        more popular you will be and the greater usefulness you will
        find.

        Wear orange, henna, scarlet, heliotrope, or mustard in
        your accessories to attract friends.`
      },
      {
        "description": "Perfection",
        "detail": `You are naturally selective and discriminating, for deep in
        your heart there is a desire for the best life has to o! er. A keen
        sense of perfection governs your life and all your undertakings.
        You aim high and strive for the perfect result. You should
        never lose sight of your ideals but sometimes you reach for a
        goal that is almost unattainable, thus making it difficult for
        others to understand you or to live up to your expectations of
        them. Your sense of the “fitness of things” is tremendously
        strong and you derive your greatest satisfaction from being
        sure everything is ust right. You do not regard any effort to be
        accurate and certain as a loss of time. You greatly desire
        knowledge and want to know the reason why. You are not a person
        to accept things at their surface value, but seek to prove, test,
        and understand the motives, causes, and underlying principles
        before you accept them or make them a part of your life. Your
        ideals are well defined and, if possible, you refuse to accept
        anything—friendship, opportunity, or environment—if it does
        not measure up to your standards.

        You have a deep intuitive feeling, and even though you
        may seem to be analytical and mental, you sense and feel hidden
        values, higher principles, spiritual and occult standards
        with which to measure life. You should accept them and use
        them in your everyday affairs. If you do they will make you
        outstanding, if not to the world, at least in your circle of
        activity, enabling you to uncover and develop the hidden laws of
        life for the improvement of humanity. Your desire for the best
        makes you particular about your associations. You are often
        very quiet in manner and have a great deal of pride. From time
        to time you experience the desire to get away from the jazz and
        excitement of the world, to live a life of solitude and serenity
        on mental horizons. No matter how active your life is, you
        should daily make it a practice to take time out to rest, relax
        and to be alone, to think, study and meditate, especially when
        you have a serious problem to meet. By so doing you will make
        fewer mistakes and discover your inner soul guidance.
        Your natural reserve may cause people to consider you
        distant, proud and hard to meet. Your faculty of analysis may
        make you appear cool, calculating and suspicious. So be careful
        of your actions and allow others to discover the really generous
        spirit you have hidden beneath a seemingly cool manner,
        especially in love and marriage. You can be exacting and demand
        explanations from others which may bring about misunderstanding
        and separation. When others misunderstand you,
        conscientiously seek to overcome the misunderstanding. At
        heart, you are really a visionary person and you love the odd,
        the mysterious and the unusual. Keep a broad faith in life itself
        and in people, but do not permit your quiet, reserved nature to
        suppress you. Go forth with dignity and pride, but be kind and
        forgiving and value your urge to get the best out of life. Let he
        charm and distinction and cleverness which you inherently possess
        lift you to a specialized and outstanding position in life.
        When you realize your desires, be sure to share with others, if
        you want to find true happiness.

        Wear purple, brick, or pearl as part of your accessories to
        win friends. `
      },
      {
        "description": "Accomplishment",
        "detail": `Deep in your heart there is a great deal of serious
        ambition. You want to get resuits and have such inner fire and force
        that you are not happy unless you are doing things in a big
        way. Human nature generally proves interesting to you, and
        while you are not exactly a humanitarian, you do try to improve
        life and conditions to get the best out of everything. You
        have the inner stamina and courage to overcome great difficulties
        and your latent ability to surmount obstacles is splendid.
        Life, however, will not always be easy for you, for you are apt
        to make it hard for yourself, striving or results until you
        overestimate your ability, or to aim so high disappointments are
        bound to follow. This courage and energy will eventually take
        you to the top in your chosen line, as you learn not to work for
        personal power alone, but for worthwhile purposes.
        Your urge is to do big things and you are more interested
        in plans that can be carried out on a large scale, dealing with
        groups, organizations, etc., than through small activities and
        enterprises. You are somewhat of an organizer at heart, like to
        direct and supervise undertakings, do not find happiness in a
        subordinate position, and have a desire for money, or at least
        the authority it brings. You have the right to money and your
        ability should bring you success in the lines indicated by your
        Destiny and Vocation, but should you make money your only
        goal, you are likely to meet keen disappointment or experience
        ups and downs in life very difficult to control. When you follow
        your true soul urge, you will sincerely strive for mastery on
        all p anes or life; deep within your heart there is a
        philosophical trend of thought and feeling.

        You should study psychology and religion philosophically
        for you possess latent powers to analyze or to do research work
        in the field oi human emotion and feeling. This will help you
        to overcome personal prejudices which otherwise might stand
        in the way of your real success in life. If you find your mind
        and heart filled with prejudice, resistance, or jealousy, strive
        for the impersonal point of view. Self-control will lead you to
        the front and give you the right to supervise and command
        other people. You should not expect too much appreciation
        from people. They may not possess the same powers o; selfmastery
        you do. It is up to you to see both sides of the question.
        Your understanding of the laws of life and your ability to
        master your moods and to cooperate with others are the secret
        of your success in the business world. Life expects more of you
        than of the average individual. So search your soul for the
        standards which will not fail you.

        Be careful that you do not take the lead too positively in
        your love affairs for you can unconsciously drive others and be
        too forceful. Sometimes you are too busy working out a plan
        or an idea to be a good “sweetie,” or again you may be too
        self-sufficient, causing others to experience disillusionment.

        Wear canary, buff, tan, opal, or ivory as part of your
        accessories to win friends. `
      },
      {
        "description": "The Beautifier",
        "detail": `You are deeply compassionate and impressionable. You
        love beauty and harmony and are capable of an impersonal attitude
        of mind. You can sense the Brotherhood of Man, and, if
        life permitted, you would love to help the whole world. Your
        ideals are high and you have a tremendous power to influence
        others for good when you make your ideals a reality in your
        own life. Your sense o s perfection is so high that you are o 'ten
        discouraged if you cannot realize your ideals or find them in
        others. You should never allow these moods to continue, for
        there is something so fine, so warm and all-embracing in your
        soul that you can touch the cosmic mind and heart if you aspire
        to Divine love. Your deep, intuitive understanding enables
        you to reach the hearts of all people, and through expressing
        love, compassion, tolerance, and philanthropy you become one
        of the chosen of the earth. This means that forgiveness, patience,
        and sympathy, even for the lowest, should always flower
        in your heart.

        Being essentially emotional, many times you will be torn
        to pieces by your feelings and the struggle between your higher
        self and your personal desires and ambitions. You will always
        strive to reach the goal of beauty, love, and service, but again
        the desire for human love, sympathy, and admiration will fill
        your mind, pulling you from your pinnacle of generosity and
        tolerance. You realize so keenly the glory of love and service
        that you sincerely seek to attain true perfection, but again you
        may allow yourself to become so involved in human emotions
        that you almost crucify your soui and cause confusion in the
        lives of those who love you. You can inspire ideals in others
        and lift them to great heights of perfection, but you need to
        control your own emotions, for they can ruin you or make you
        too sensitive for your own good unless turned to creative
        endeavor of universal nature. Follow the beauty of your own soul
        at all times.

        You are a dreamer of dreams but you have a dynamic, inner
        force and can materialize your dreams of love and success
        when you remain true to your inner desire for beauty, harmony,
        and service. Never be disappointed, moody, or critical when
        you discover that you are only human like the rest of the
        world; for there is a timid, vacillating side to your nature, and
        should you lose faith in yourself or in life, or be afraid to stand
        up for your ideals, you could be very unhappy. Being naturally
        generous and forgiving, and desirous o^ doing good in the
        world, you may impulsively enter into associations and
        undertakings which you do not ully understand, and find yourself
        imposed upon. Just be wiser next time and temper your love of
        service w'ith reason. At heart you are romantic and you are
        capable of great intensity in love. But romance can quickly fade if
        your mate is not of the same esthetic nature, ‘or you abhor the
        unlovely, discordant, and inharmonious. Don’t kill out the
        drama and glamor of your soul. Live up to your ideals.

        Wear a lot of color, especially the pastel shades, if you
        want to attract friends. `
      },
    ]

    return values[number - 1];
  };

  getPersonalityDescription = (number) => {
    const values = [
      {
        "description": "Inspiring",
        "detail": `The One should always be outstanding — not forceful or
        aggressive, but dignified and correct in lines and detail. Even a
        short person with a number One Personality should never be
        overweight. Straight lines, loose, but well-fitted are right.
        Number One Personality is a likeable personality and often
        very persuasive in manner. The number One should wear and
        also furnish the home in bright and cheerful colors. `
      },
      {
        "description": "Neat",
        "detail": `The Two should always be neat and make cleanliness
        important—and generally does. The number Two may even be
        fussy about having everything exact in detail. A pleasing
        personality with gentle manner is the number Two. A knack of
        wearing clothes can be cultivated, but loud or showy apparel
        should be put aside for soft, flowing, easy-to-wear, neat, and
        shining clothing. The number Two Personality should study
        styles and adapt them to its own personality and not be plain
        or colorless. `
      },
      {
        "description": "Friendly",
        "detail": `The Three is generally friendly and easy to talk to. Being
        of artistic nature, the Three likes to wear jewelry and more
        fancy clothing with ribbons and bows. The number Three
        should not overdress or wear extreme styles, but should be
        attractively dressed—prettily and in good materials. `
      },
      {
        "description": "Practical",
        "detail": `The Four looks well in tailor-made styles, combining the
        straight fines of the number One and the neatness of the number
        Two. Good material of durable wearing qualities should be
        chosen, for the practical qualities of the number Four show in
        personality as well as in the other sides of the character, he
        number Four should never be overdressed. `
      },
      {
        "description": "Innovative",
        "detail": `The Five is inclined to be up-to-date at all times, versatile
        in selection but may go to extremes, just to be daring and in
        the limelight. The Five Personality should not deliberately be
        flashy and needs to realize the value of a good personality,
        stylishly expressed, modern, and fitting the occasion.`
      },
      {
        "description": "Parental",
        "detail": `The Six often fails to give importance to looks or clothing.
        The bearing is generally sympathetic and inspires confidence—
        the mother y and fatherly type. The number Six is not style-conscious
        as a rule but enjoys good clothes of good material. Six
        likes to be comfortable in easy-to-wear clothing. The number
        Six should always be well dressed and give thought to the way
        it looks and is dressed but cannot afford to be overweight. `
      },
      {
        "description": "Close-Knit",
        "detail": `The Seven gains through a well-dressed and well-groomed
        personality. Likeable, friendly, and a good talker when well
        acquainted, it may be somewhat aloof in manner and appear
        hard to know or meet. Good style is important—straight lines,
        with touches of sparkle and dash. A colorful, although correct,
        personality means much to the Seven. Confidence comes to the
        Seven through being well dressed and in good clothing, even
        expensive materials. `
      },
      {
        "description": "Impressive",
        "detail": `The Eight should always be well dressed and present a
        successful-appearing personality. It likes good materials—plaids,
        tweeds, and heavier types of clothing (sports clothes). There is
        a touch of showman in the Eight and it is generally not overlooked
        in business association or social gatherings. The Eight
        Personality is friendly, persuasive, and positive in manner and
        speech.`
      },
      {
        "description": "Good-Fellow",
        "detail": `The Nine should never wear black, but often does, feeling
        well dressed according to fashion in black. The number Nine is
        all-inclusive and gains through the use of color in business and
        as the expression of the personality. A “good-fellow” manner
        is characteristic of the Nine Personality and it gains many
        friends through a warm and generous manner. It can look
        young a long time if care is taken of skin and attention given to
        the posture. It may cultivate careless dress, for it, too, like the
        Six , wants to be comfortable. It can influence others because
        of its pleasing manner, but it can be distant and abstract when
        not interested. It sometimes appears to lack in forcefulness and
        attraction, although as a rule the number Nine has a magnetic
        Personality. `
      },
    ]

    return values[number - 1];
  };

  getRealityDescription = (number) => {
    const values = [
      {
        "description": "Independence",
        "detail": `The talents, abilities, interests, and individuality of the
        number One will support the latter days of life. The individual
        will be very independent, very clever, and find originality of
        thoughts: giving opportunity for leadership. The possibility of
        becoming very set and fixed in opinions may cause problems in
        association.`
      },
      {
        "description": "Diplomacy",
        "detail": `The field of diplomacy is open to the number Two. The
        talent for getting on with others and bringing many together
        for a common good in public works and friendly association
        means success. The arts, music, museums, libraries give
        pleasure and opportunity. The Two is inclined to turn to religion,
        spiritual work, and teachings. A beautiful humility, born of
        the awareness of “that something” called God, attracts people
        and opportunity to touch the minds and hearts of mankind. `
      },
      {
        "description": "Self-Expression",
        "detail": `The opportunity for a rich, full life is present, the privilege
        of true sel'-expression, perhaps greater than at any time during
        the life. Even the character who has not previously been able to
        express the thoughts and feelings in words, music, gaiety or
        along any line of creative interest will be surprised at the
        growth and development which come in this respect. To scatter
        the forces and talents in self-indulgence at this time of life is
        to waste the opportunity for a wonderful use of the coveted
        power of imagination. `
      },
      {
        "description": "Accomplishment",
        "detail": `The opportunity to actually accomplish and put into form
        many of the ideas not before possible is present. There will be
        work to do and many practical circumstances to meet in order
        that a foundation may be placed to build upon. Religious,
        scientific, and educational interests can support and build
        a useful life. System, order, and organization are important and
        must be added to the activities. There is a work to be done in
        the latter days of life. `
      },
      {
        "description": "Experience",
        "detail": `This does not promise retirement and indicates an active
        latter days of life. It is not a dull period, gives opportunity for
        travel, a variety of experiences, and a great deal of freedom of
        action and thought. All progressive, forward-moving activities
        for the advancement and improvement of civic living give
        opportunity. Too many irons in the fire can lead to uncertainty
        and scattered forces. Seek a worthwhile work along lines of
        public administration. `
      },
      {
        "description": "Service",
        "detail": `The latter days for the number Six should be filled with
        useful endeavor having to do with humanitarian service.
        Through this service, love and protection will be the reward for
        the latter days of life. The best things in life, comfort and
        financial support, will be present when the thoughts are for the
        good o others in a broad and impersonal manner. Duty and
        responsibility will be there also, but the means to do and the
        accomplishment can be easily attained. `
      },
      {
        "description": "Wisdom",
        "detail": `The right to retire and to follow the mental interests is
        present. Because the Seven has specialized knowledge, gained
        through the years, others will seek this knowledge, wisdom,
        and understanding. Opportunity lies in the field of education,
        science, occult thinking or study; and time may be given to
        writing, invention, and to the unusual, even odd, lines
        of endeavor. The desire may be to withdraw from the crowd and to
        become absorbed in some introvert line of activity. `
      },
      {
        "description": "Authority",
        "detail": `The promise of recognition, position, and authority for
        the latter days of life is present. Life will demand good
        character, self-discipline, courage, and executive ability. Through
        this, opportunity to supervise, regulate, and direct the affairs
        of others will be present. The care of property and land may be
        part of the task of supervision. Research, investigation,
        counseling, advisory positions give usefulness and personal
        satisfaction. Philosophical thought and interest add strength to the
        character and undertakings. `
      },
      {
        "description": "Philanthropy",
        "detail": `The world of philanthropy is the reward of the number
        Nine Reality for the latter days of life. Service to mankind and 
        the realization of the brotherhood of man is part of the reward.
        To be able to live above the jealousies, fears, and greed
        of mankind is part of the victory of the latter days. The world
        of drama, art, literature, beauty in all its forms gives personal
        and financial reward. To live personally and to desire only
        personal love is to miss the goal of love and companionship which
        will come through work done for all people, regardless of race,
        creed, or culture. `
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
