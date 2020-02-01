'use strict'

const roman = (() => {

    const numbers = {
        I : 1, V : 5, X : 10, L : 50, C : 100, D : 500, M : 1000,
    }

    const roman_numbers = {
        1 : "I", 5 : "V", 10 : "X", 50 : "L", 100 : "C", 500 : "D", 1000 : "M",
    }

    const digits = Object.keys(numbers);

    return roman => {

        const isNumeric = /^\d+$/.test(roman)

        if ( !isNumeric ) {

            const reducer = (prev, el, ind, str) => (
                // True in case of IX = -1 + 10, IL = -1 + 50, etc.
                digits.indexOf(el) < digits.indexOf(str[ ind + 1 ]) ?
                    prev - numbers[ el ] : prev + numbers[ el ]
            )

            return roman.toUpperCase().split("").reduce(reducer, 0)

        } else {
            roman = Number( roman )
            let res = ""

            if( roman < 0 )
                throw new Error("Roman Number's are in range from 1 to 3999")

            while( roman > 0 ) {
                // Determine Base
                const base = roman <= 9 ? 1 :
                    roman <= 99 ? 10 :
                        roman <= 999 ? 100 :
                            roman <= 3999 ? 1000 : null
                if( !base )
                    throw new Error("Roman Number's are in range from 1 to 3999")

                if( roman >= 9 * base ) {
                    // IX, LM, etc.
                    res += roman_numbers[ base ]+roman_numbers[ base * 10 ]
                    roman -= 9 * base
                } else if( roman >= 5 * base ) {
                    // V, L, D
                    res += roman_numbers[ base*5 ]
                    roman -= 5 * base
                } else if( roman >= 4 * base ) {
                    // IV, XL, CD
                    res += roman_numbers[ base ]+roman_numbers[ base * 5 ]
                    roman -= 4 * base
                }

                while ( roman >= base)
                {
                    res += roman_numbers[ base ]
                    roman -= base
                }
            }
            return res
        }
    };
})()