import os.path
import re


class Question:
    def __init__(self, question_id, survey_id, question, first_modified, last_modified, topic_id):
        self.question_id = int(question_id.strip().strip('"'))
        self.survey_id = int(survey_id.strip().strip('"'))
        self.question = question.strip('"')
        self.first_modified = first_modified
        self.last_modified = last_modified
        self.topic_id = int(topic_id.strip().strip('"'))


class Response:
    def __init__(self, self_id, response_id, question_id, user_response, mod_response, first_modified, last_modified):
        self.self_id = int(self_id.strip('"'))
        self.response_id = response_id.strip('"')
        self.question_id = int(question_id.strip('"'))
        self.user_response = user_response.strip('"')
        self.mod_response = mod_response.strip('"')
        self.first_modified = first_modified.strip('"')
        self.last_modified = last_modified.strip('"')


class Topic:
    def __init__(self, topic_id, topic, description, first_modified, last_modified):
        self.topic_id = int(topic_id.strip('"'))
        self.topic = topic.strip('"')
        self.description = description.strip('"')
        self.first_modified = first_modified.strip('"')
        self.last_modified = last_modified.strip('"')


class Survey:
    def __init__(self, questions, responses, topics):
        self.questions = questions
        self.responses = responses
        self.topics = topics


def load_data(questions, responses, topics):
    questions_lines = questions.readlines()
    responses_lines = responses.readlines()
    topics_lines = topics.readlines()

    questions = []
    responses = []
    topics = []

    for line in questions_lines:
        line_list = re.split(r',(?=")', line)
        questions.append(Question(line_list[0], line_list[1], line_list[2], line_list[3], line_list[4], line_list[5]))

    for line in responses_lines:
        line_list = line.split(",")
        responses.append(Response(line_list[0], line_list[1], line_list[2], line_list[3], line_list[4], line_list[5],
                                  line_list[6]))

    for line in topics_lines:
        line_list = line.split(",")
        topics.append(Topic(line_list[0], line_list[1], line_list[2], line_list[3], line_list[4]))

    questions.sort(key=lambda x: x.question_id)
    responses.sort(key=lambda x: x.question_id)
    topics.sort(key=lambda x: x.topic_id)

    return Survey(questions, responses, topics)


def main():
    try:
        questions = open(os.path.join(os.path.dirname(__file__), "questions.csv"), "r")
        responses = open(os.path.join(os.path.dirname(__file__), "responses.csv"), "r")
        topics = open(os.path.join(os.path.dirname(__file__), "topics.csv"), "r")
        template = open(os.path.join(os.path.dirname(__file__), "template.tex"), "r")

    except IOError:
        print("File not found...")
        exit(-1)

    survey = load_data(questions, responses, topics)

    output = open("output.tex", "w")

    for line in template:
        output.write(line)

    q_num = 1

    for topic in survey.topics:
        output.write("\\addcontentsline{toc}{chapter}{" + topic.topic + "}\n")
        output.write("\\chapter*{\\textsc{" + topic.topic + "}}\n")

        for question in survey.questions:
            if question.topic_id == topic.topic_id:
                output.write("\\addcontentsline{toc}{section}{" + question.question + "}\n")
                output.write("\\section*{" + question.question + "}\n")
                q_num += 1
                for response in survey.responses:
                    if response.question_id == question.question_id:
                        output.write("\\noindent\\fcolorbox{black}{white}{%\n")
                        output.write("\\minipage[t]{\\dimexpr1.0\\linewidth-2\\fboxsep-2\\fboxrule\\relax}\n")
                        output.write("\\subsection*{\\textsc{Your Response}}\n")
                        output.write(response.user_response + "\n")
                        output.write("\\endminipage}\\hfill\n")
                        output.write("\n\n\\medskip\n\n")
                        output.write("\\noindent\\fcolorbox{black}{yellow}{%\n")
                        output.write("\\minipage[t]{\\dimexpr1.0\\linewidth-2\\fboxsep-2\\fboxrule\\relax}\n")
                        output.write("\\subsection*{\\textsc{Administrator Response}}\n")
                        output.write(response.mod_response + "\n")
                        output.write("\\endminipage}\\hfill\n")
                        output.write("\n\n\\medskip\n\n")

        q_num = 1

    output.write("\\end{document}")


if __name__ == "__main__":
    main()
