#!/usr/bin/env python

# take in an input like 2019p7q4 and return the url for the past paper, has options such as -s
# default -- paper url -- https://www.cl.cam.ac.uk/teaching/exams/pastpapers/y2019p7q4.pdf
# -s for solution -- solution url -- https://www.cl.cam.ac.uk/teaching/exams/solutions/2019/2019-p07-q04-solutions.pdf
# if there is one argument, take that as the course name
# course url -- FormalModelsofLanguage -- https://www.cl.cam.ac.uk/teaching/exams/pastpapers/t-FormalModelsofLanguage.html
# the course name doesn't have to be exact, but it has to be close enough to the actual course name

import sys
import argparse
import webbrowser

courses = [
    "Advanced Algorithms",
    "Advanced Computer Architecture",
    "Algorithms",
    "Algorithms 1",
    "Algorithms 2",
    "Artificial Intelligence",
    "Bioinformatics",
    "Business Studies",
    "Comparative Architectures",
    "Compiler Construction",
    "Complexity Theory",
    "Computation Theory",
    "Computer Design",
    "Computer Networking",
    "Computer Vision",
    "Concepts in Programming Languages",
    "Concurrent and Distributed Systems",
    "Cryptography",
    "Cybersecurity",
    "Data Science",
    "Databases",
    "Denotational Semantics",
    "Digital Electronics",
    "Digital Signal Processing",
    "Discrete Mathematics",
    "E-Commerce",
    "Economics, Law and Ethics",
    "Formal Models of Language",
    "Foundations of Computer Science",
    "Foundations of Data Science",
    "Further Graphics",
    "Further Human Computer Interaction",
    "Further Java",
    "Hoare Logic and Model Checking",
    "Information Theory",
    "Interaction Design",
    "Introduction to Computer Architecture",
    "Introduction to Graphics",
    "Introduction to Probability",
    "Logic and Proof",
    "Machine Learning and Bayesian Inference",
    "Machine Learning and Real-world Data",
    "Mobile and Sensor Systems",
    "Object-Oriented Programming",
    "Operating Systems",
    "Optimising Compilers",
    "Principles of Communications",
    "Programming in C",
    "Programming in C and C++",
    "Prolog",
    "Quantum Computing",
    "Randomised Algorithms",
    "Security",
    "Semantics of Programming Languages",
    "Software and Security Engineering",
    "Types"
]


def main():
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('year', metavar='year', type=int, nargs='+',
                        help='year of the paper')
    parser.add_argument('paper', metavar='paper', type=int, nargs='+',
                        help='paper number')
    parser.add_argument('question', metavar='question', type=int, nargs='+',
                        help='question number')
    parser.add_argument('-s', action='store_true',
                        help='add -s for solution')
    args = parser.parse_args()
    # handle the course case
    if len(args.year) == 1:
        course = args.year[0]
        for c in courses:
            if course.lower() in c.lower():
                url = "https://www.cl.cam.ac.uk/teaching/exams/pastpapers/t-" + c.replace(" ", "") + ".html"
                print(url)
                webbrowser.open(url)
                return
        print("Course not found")
        return
    if args.s:
        url = "https://www.cl.cam.ac.uk/teaching/exams/solutions/20" + str(args.year[0]) + "/20" + str(args.year[0]) + "-p" + str(args.paper[0]) + "-q" + str(args.question[0]) + "-solutions.pdf"
    else:
        url = "https://www.cl.cam.ac.uk/teaching/exams/pastpapers/y20" + str(args.year[0]) + "p" + str(args.paper[0]) + "q" + str(args.question[0]) + ".pdf"
    print(url)
    # open the url in default browser
    webbrowser.open(url)


if __name__ == "__main__":
    main()

"""
How to use the script:
python pp.py 19 7 4
"""