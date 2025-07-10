from fastapi import APIRouter, UploadFile, File
from app.services import process_files
from fastapi import BackgroundTasks
from app.utils.response import success_response
from sql.crud.upload_paper import store_report
router =APIRouter()

@router.post("/upload_main")
async def upload_file(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    # analyzed_content = process_files.process(file)
    analyzed_content = \
    {
        "title": "Learning Deep Features for Discriminative Localization",
        "authors":
            "Bolei Zhou, Aditya Khosla, Agata Lapedriza, Aude Oliva, Antonio Torralba",
        "abstract": "In the Transformer model, self-attention \
        combines information from attended embeddings into the representation of the focal embedding in the next layer. Thus, across layers of the Transformer, information originating \
        from different tokens gets increasingly mixed. \
        This makes attention weights unreliable as explanations probes. In this paper, we consider \
        the problem of quantifying this flow of information through self-attention. We propose two \
        methods for approximating the attention to input tokens given attention weights, attention \
        rollout and attention flow, as post hoc methods \
        when we use attention weights as the relative \
        relevance of the input tokens. We show that \
        these methods give complementary views on \
        the flow of information, and compared to raw \
        attention, both yield higher correlations with \
        importance scores of input tokens obtained using an ablation method and input gradients.",
        "citations_count": 30,
        "domain": "Large Language Models",
        "keywords":  "Sequence transduction, Attention mechanism, Machine translation, Neural machine translation, Transformer model, BLEU score, Byte-pair encoding",
        "key_findings": "The Transformer model, based solely on the attention mechanism, achieves state-of-the-art results in machine translation, outperforming models that rely on recurrence or convolutions.  Experiments show the impact of varying the number of attention heads and dimensions while keeping computation constant.  The paper also presents results using different model sizes and training regimes.",
        "methodology": "The study uses a Transformer model architecture, which relies solely on attention mechanisms.  Experiments involve varying hyperparameters such as the number of attention heads, attention key and value dimensions, and dropout rate.  The models were trained on the WMT 2014 English-German and English-French datasets using byte-pair encoding.  Evaluation metrics include BLEU score and perplexity.",
        "limitations": "Ask AI for better insights!",
        "replication_suggestions": "Ask AI for much more details",
        "file_type": "pdf",
        "date": None,
        "journal": None,
        "doi": None
    }
    background_tasks.add_task(store_report, analyzed_content)
    return success_response(analyzed_content)
