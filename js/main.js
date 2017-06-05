// Main JS File for Cat Lady Scale

$(document).ready(function(){

    /*
     * Behavior Class
     * constructor - needs the description and pointValue to construct
     * listItem function - returns the behavior as an html string
     */
    function Behavior (description, pointValue) {
        this.description = description;
        this.pointValue = pointValue;
    }
    Behavior.prototype = {
        getListItem: function () {
            return '<div class="behavior-item">' +
                '<div class="description">' + this.description + '</div>' +
                '<div class="points">' + this.pointValue + '</div>' +
                '</div>';
        },
    }

    /*
     * Status Class
     * constructor - needs the title for the status and a corresponding image
     * imagePath function - returns local path to the image (for using in the src attr)
     */
    function Status (title, image) {
        this.title = title;
        this.image = image;
    }
    Status.prototype = {
        imagePath: function (){
            return 'images/' + this.image;
        }
    }

    /*
     * Cat Lady Behaviors
     * list of all possible behaviors to fill the drop down form
     */
    var catLadyBehaviors = [
        new Behavior("agrees that there's a cat gif for everything", 3),
        new Behavior("own one dog", -2),
        new Behavior("own one cat", 2),
        new Behavior("own more than one cat", 5),
        new Behavior("own more than one dog", -5),
        new Behavior("takes selfies with cats", 4),
        new Behavior("goes without food to avoid waking the cat on your lap", 5),
        new Behavior("allergic to cats, but have one anyway", 5),
        new Behavior("ignore all humans to say hello to the cat", 4),
        new Behavior("own more than one cat themed shirt", 1),
        new Behavior("taught cat to fetch", 3),
        new Behavior("avoids reddit because of all the cat gifs", -5),
        new Behavior("allergic to cats", -2),
        new Behavior("refuse to visit friends because they own a cat", -3),
        new Behavior("refuse to spend entire paycheck on cat", -4),
    ];

    /*
     * Cat Lady Scale
     * description: the cat lady scale is indexed by the number on the scale. Each
     * scale number has an object with a title and image name associated with it.
     */
    var CAT_LADY_SCALE = {
        10: new Status("Cat-sylum", 'cat_lady.jpg' ),
        9: new Status("ALL OF THE CATS", 'all_kittens.jpg' ),
        8: new Status("Takin Selfies With Cats", 'cat_selfie.jpg' ),
        7: new Status("A One-Cat Kind of Human", 'one_cat.jpg' ),
        6: new Status("Cat Gifs Are...Alright", 'grumpy.jpg' ),
        5: new Status("Indifferent", 'cat_dog_friends.jpg' ),
        4: new Status("Ehh, Dogs Greater...", 'cat_backseat.jpg' ),
        3: new Status("Dogs are where it's at", 'dogs.jpg' ),
        2: new Status("I wish I were allergic", 'allergic.jpg' ),
        1: new Status("Cats...like, the musical?", 'cats.jpg' ),
        0: new Status("What's a cat? Never heard of 'em", 'dog_heaven.jpg' ),
    };

    /*
     * Cat Lady Object
     * behaviors - array of behavior objects
     * addBehavior - function that adds behavior and updates cat lady object as necessary
     * status - the current cat lady status object
     * updateStatus - function that updates the cat lady objects status
     */

    // var currSum = 5;
    currentSum = 5;
    var catLady = {
        behaviors: [],
        addBehavior : function (newBehavior) {

            this.behaviors.push(newBehavior);
            this.updateStatus();
            this.updateScale();
        },
        status: CAT_LADY_SCALE[5], // just the inital status... INDIFFERENT
        updateStatus: function () {

            sum = currentSum;
            
            // Match sum to a value in the CAT_LADY_SCALE object and update this catLady status property
            if(sum >=  10) {
                this.status = CAT_LADY_SCALE[10];
                this.scale = sum;
            } else if (sum > 0) {
                this.status = CAT_LADY_SCALE[sum];
                this.scale = sum;
            } else {
                this.status = CAT_LADY_SCALE[0];
                this.scale = sum;
            }
        },
        scale: this.status,
        updateScale: function() {
            
            if(this.scale >=10) {
                $('.scale-button').removeClass('scale-button-active');
                $('#10').addClass('scale-button-active');
                $(`#10 + span`).css('font-weight', 'bold');
            } else if(this.scale <= 0) {
                $('.scale-button').removeClass('scale-button-active');
                $('#0').addClass('scale-button-active');
                $(`#0 + span`).css('font-weight', 'bold');
            } else {
                $('.scale-button').removeClass('scale-button-active');
                $(`#${this.scale}`).addClass('scale-button-active');
                $(`#${this.scale} + span`).css('font-weight', 'bold');
            }
        }
    };

    /*
     * Add Behavior Click Event
     * handles when the user adds a behavior
     */

    $('.new-behavior').on('change', 'input:checkbox', function(e) {
        // Prevent the default page reload using jquery.
        e.preventDefault();

        var indexValue = $(`#${this.id}`).val();
        
        var behavior = catLadyBehaviors[indexValue];

        if($(this).is(':checked')) {
            currentSum += behavior.pointValue;
        } else {
            currentSum -= behavior.pointValue;
        }
        
        catLady.addBehavior(behavior);

        // Display the cat lady status
        displayStatus(catLady.status);
    });

    /*
     * Update Status Display
     * updates the cat lady status display in the html with the cat status object it was passed
     */
    function displayStatus (status)
    {
        $('.status-image img').attr('src', catLady.status.imagePath());
        $('.status-title').html(catLady.status.title);
    }

    /*
     * Display Results Scale
     * updates the scale to reflect status
    */
    function displayScale() {
        for(let s = 0; s < 11; s++) {
            $(`<div class="scale-selection tooltip">
                    <div id="${s}" class="scale-button" value="${s}"> </div>
                    <span>${s}</span>
                    <span class="tooltiptext"></span>
                </div>`).appendTo('.scale-display');
        }  
    }

    /*
     * Display Scale Title on Hover
    */
    function displayScaleHover() {
        for(var t = 0; t < 11; t++) {
            var tip = CAT_LADY_SCALE[t].title;
            $(`#${t} ~ .tooltiptext`).html(tip);
        } 
    }

    /*
     * Fill Behavior Drop Down
     * adds all behaviors from the catLadyBehaviors array as options in the html dropdown
     */
    function fillBehaviorDropDown ()
    {
        for (var i = 0; i < catLadyBehaviors.length; i++) {
            var description = catLadyBehaviors[i].description;
            var points = catLadyBehaviors[i].pointValue;

            var checkedbox = `<div class="behavior-checkboxes">
                <input type="checkbox" id="checkbox-no-${i}" name="behavior" value="${i}" class="checkbox">
                <label for="checkbox-no-${i}">${description}</label>
                </div>`
            $('#new-behavior-form').append(checkedbox);
        }
    }    

    // initial setup
    fillBehaviorDropDown(); // fill drop down
    displayStatus(catLady.status); // display initial cat lady status
    displayScale();
    displayScaleHover();
});
